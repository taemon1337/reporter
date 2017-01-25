<reports-show>
  <div class="form-horizontal col-xs-12">
    <div class="pull-right">
      <a href="./api/reports/{ report._id }/download" class="btn btn-primary">Download</a>
      <a href="./#/reports/{ report._id }/edit" class="btn btn-primary">Edit</a>
    </div>

    <h1>
      { report.title }
      <small>{ report.description }</small>
    </h1>
    <hr/>
    <h3>Report Fields</h3>
    <form-tree field="fields" object={ report.fields }></form-tree>

  </div>

  <script>
    var self = this
    self.report = opts.report

    self.on('tree:change', function(data) {
      self.report.fields = data.object
      riot.app.save("reports", self.report, { method: "PUT" }, function(resp) {
        for(var key in resp) { self.report[key] = resp[key] }
        self.update({ report: self.report })
      })
    })
  </script>
</reports-show>
