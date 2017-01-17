<templates-edit>
  <div class="row">
    <div class="col-xs-12">
      <form onsubmit={ save } method="post" action="/api/templates/{ template._id }" class="form-horizontal" enctype="multipart/form-data">
        <form-group label="Template File">
          <input onclick={ parent.openDialog } class="form-control" type="text" value="{ parent.file.name }" readonly="true">
        </form-group>
        <input onchange={ fileSelected } class="hidden" type="file" />

        <form-group label="Name">
          <input type="text" class="form-control" placeholder="name the template..." name="name" value={ parent.template.name }>
        </form-group>

        <form-group label="Description">
          <textarea class="form-control" rows=4 name="description" placeholder="summary or description">{ parent.template.description }</textarea>
        </form-group>

        <form-group label="Select Profile">
          <select-option default="--select profile--" current={ (parent.template.profile || {})._id } fetch={ parent.fetch_profiles } option_text="name" field="profile"></select-option>
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
    this.template = opts.template
    this.file = opts.file || opts.template.file || {}

    this.save = function(e) {
      e.preventDefault()
      var record = self.template
      var formdata = new FormData(e.target);
      var headers = self.template._etag ? { "If-Match": self.template._etag } : {}
      if(self.file instanceof File) { formdata.append("file", self.file) }
      if(record.profile.length === 24) { formdata.append("profile", record.profile) }

      $.ajax({
        url: e.target.action,
        method: self.template._id ? "PATCH" : "POST",
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
      self.template[e.target.name] = $(e.target).val()
      self.update({ template: self.template })
    }

    this.openDialog = function() {
      $("input[type='file']").click()
    }

    this.fileSelected = function(e) {
      if(e.target.files && e.target.files.length === 1) {
        self.update({ file: e.target.files[0] })
      }
    }

    this.fetch_profiles = function(cb) {
      riot.app.fetch("profiles", null, null, cb)
    }

    this.on('option:selected', function(data) {
      console.log("option selected", data)
      self.template[data.field] = data.value
    })

    this.cancel = function() {
      window.history.back()
    }
  </script>
</templates-edit>
