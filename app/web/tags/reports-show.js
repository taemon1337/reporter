<reports-show>
  <div class="form-horizontal col-xs-12">
    <div class="pull-right">
      <a href="/api/reports/{ report._id }/download" class="btn btn-primary">Download</a>
      <a href="/#/reports/{ report._id }/edit" class="btn btn-primary">Edit</a>
    </div>

    <h1>
      { report.title }
      <small>{ report.description }</small>
    </h1>
    <hr/>
    <h3>Report Fields</h3>
    <json-tree field="fields" object={ report.fields }></json-tree>

  </div>

  <script>
    var self = this
    self.report = opts.report

    self.keyup = function(e) {
      if(e.keyCode === 13) {
        self.addField(e)
      }
    }

    self.addField = function(e) {
      var input = $(e.target).parents('.input-group').find('input')
      self.tags['key-value-inputs'].trigger('add', { key: input.val() })
      setTimeout(function() { input.val('') }, 100)
    }

    self.on('tree:change', function(data) {
      self.report.fields = data.object
      riot.app.save("reports", self.report, { method: "PUT" }, function(resp) {
        self.update({ report: resp })
      })
    })
  </script>
</reports-show>
