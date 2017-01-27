<forms-show>
  <div class="col-xs-12">
    <div class="pull-right">
      <a href="./#/forms/{ form._id }/edit" class="btn btn-primary">Edit</a>
    </div>
    <h1>
      { form.name }
      <small>{ form.description }</small>
    </h1>
    <hr/>
  </div>

  <div class="row">
    <div class="col-xs-12">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="pull-right">
            <i>{ form.file.name }</i>
            <i>({ humanFileSize(form.file.length) })</i>
            <a href=".{ form.file.file }" download={ form.file.name } title="Download">
              <span class="fa fa-download"></span>
            </a>
          </div>
          <h3 class="panel-title">
            Form Design
          </h3>
        </div>
        <div class="panel-body">
          <div class="col-xs-12">
            <form-builder></form-builder>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    var self = this
    self.form = opts.form
    self.editor = opts.editor

    self.on('form-element:edit', function(config) {
      self.update({ editor: config })
    })

  </script>
</forms-show>
