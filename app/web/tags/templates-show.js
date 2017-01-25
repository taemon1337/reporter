<templates-show>
  <div class="col-xs-12">
    <div class="pull-right">
      <a href="./#/templates/{ template._id }/edit" class="btn btn-primary">Edit</a>
    </div>
    <h1>
      { template.name }
      <small>{ template.description }</small>
    </h1>
    <hr/>
  </div>

  <div class="row">
    <div class="col-xs-6">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="pull-right">
            <i>{ humanFileSize(template.file.length) }</i>
            <a href=".{ template.file.file }" download={ template.file.name } title="Download">
              <span class="fa fa-2x fa-download"></span>
            </a>
          </div>
          <h3 class="panel-title">
            <a href=".{ template.file.file }" title="Download">
              { template.file.name }
            </a>
          </h3>
        </div>
        <div class="panel-body">
          <pre>{ JSON.stringify(template.file,null,4) }</pre>
        </div>
      </div>
    </div>
  </div>

  <script>
    var self = this
    self.template = opts.template

    self.on('tree:change', function(data) {
      self.template.fields = data.object
      riot.app.save("templates", self.template, { method: "PUT" }, function(resp) {
        for(var key in resp) { self.template[key] = resp[key] }
        self.update({ template: self.template })
      })
    })
  </script>
</templates-show>
