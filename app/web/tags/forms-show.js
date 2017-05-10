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
          <div if={ form.file } class="pull-right">
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
            <div class="pull-right">
              <button onclick={ save } class="btn btn-primary">Save</button>
            </div>
            <form-designer form={ form.form }></form-designer>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    var self = this
    self.form = opts.form

    self.save = function() {
      riot.app.save("forms", self.form, null, function(resp) {
        for(var key in resp) { self.form[key] = resp[key] }
        self.update({ form: self.form })
      })
    }
  </script>
</forms-show>
