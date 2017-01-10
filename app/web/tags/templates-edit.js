<templates-edit>
  <div class="row">
    <div class="col-xs-12">
      <form onsubmit={ save } method="post" action="/api/templates/{ template._id }" class="form-horizontal" enctype="multipart/form-data">
        <form-group if={ template._id } label="Template File">
          <input class="form-control" type="text" value="{ parent.template.file.name }" readonly="true">
        </form-group>

        <form-group if={ !template._id } label="Template File">
          <input class="form-control" type="file" name="file" />
        </form-group>

        <form-group label="Name">
          <input type="text" class="form-control" placeholder="name the template..." name="name" value={ parent.template.name }>
        </form-group>

        <form-group label="Description">
          <textarea class="form-control" rows=4 name="description" placeholder="summary or description">{ parent.template.description }</textarea>
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
    this.template = opts.template || {}

    this.save = function(e) {
      console.log(e.target.method)
      e.preventDefault()
      var record = self.template
      var formdata = new FormData(e.target);
      var headers = self.template._etag ? { "If-Match": self.template._etag } : {}

      $.ajax({
        url: e.target.action,
        method: self.template._id ? "PATCH" : "POST",
        data: formdata,
        contentType: false,
        processData: false,
        headers: headers
      }).then(function(resp) {
        console.log("RESP: ", resp)
      }).catch(function(err) {
        console.error("Error: ", err.stack)
      })
    }

    this.fieldChange = function(e) {
      self.template[e.target.name] = $(e.target).val()
      self.update({ template: self.template })
    }

    this.cancel = function() {
      window.history.back()
    }
  </script>
</templates-edit>
