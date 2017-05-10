<forms-edit>
  <div class="row">
    <div class="col-xs-12">
      <form onsubmit={ save } method="post" action="./api/forms/{ form._id }" class="form-horizontal" enctype="multipart/form-data">
        <form-group label="Template File">
          <input onclick={ parent.openDialog } class="form-control" type="text" value="{ parent.file.name }" readonly="true">
        </form-group>
        <input onchange={ fileSelected } class="hidden" type="file" />

        <form-group label="Name">
          <input type="text" class="form-control" placeholder="name the form..." name="name" value={ parent.form.name }>
        </form-group>

        <form-group label="Group">
          <input type="text" class="form-control" placeholder="group or organization..." name="grouping" value={ parent.form.grouping }>
        </form-group>

        <form-group label="Description">
          <textarea class="form-control" rows=4 name="description" placeholder="summary or description">{ parent.form.description }</textarea>
        </form-group>

        <form-group>
          <button type="submit" class="btn btn-primary">Save</button>
          <button onclick={ parent.cancel } type="button" class="btn btn-default">Cancel</button>
        </form-group>
      </form>
    </div>
  </div>

  <script>
    var self = this
    this.form = opts.form
    this.file = opts.file || opts.form.file || {}

    this.save = function(e) {
      e.preventDefault()
      var record = self.form
      var formdata = new FormData(e.target);
      var headers = self.form._etag ? { "If-Match": self.form._etag } : {}
      if(self.file instanceof File) { formdata.append("file", self.file) }

      $.ajax({
        url: e.target.action,
        method: self.form._id ? "PATCH" : "POST",
        data: formdata,
        contentType: false,
        processData: false,
        headers: headers
      }).then(function(resp) {
        for(var key in resp) { record[key] = resp[key] }
        self.update({ record: record })
        riot.app.notice.saved(record);
      }).catch(function(err) {
        console.error("Error: ", err.stack)
      })
    }

    this.fieldChange = function(e) {
      self.form[e.target.name] = $(e.target).val()
      self.update({ form: self.form })
    }

    this.openDialog = function() {
      $("input[type='file']").click()
    }

    this.fileSelected = function(e) {
      if(e.target.files && e.target.files.length === 1) {
        self.update({ file: e.target.files[0] })
      }
    }

    this.on('option:selected', function(data) {
      console.log("option selected", data)
      self.form[data.field] = data.value
    })

    this.cancel = function() {
      window.history.back()
    }
  </script>
</forms-edit>
