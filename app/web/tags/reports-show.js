<reports-show>
  <div class="form-horizontal col-xs-12">
    <div class="pull-right">
      <a href="./api/reports/{ report._id }/download" class="btn btn-primary">Download</a>
      <a href="./#/reports/{ report._id }/edit" class="btn btn-primary">Edit</a>
      <button show={ changed } onclick={ save } class="btn btn-success">Save</button>
      <button onclick={ show } class="btn btn-default">
        <span class="fa fa-info-circle"></span>
      </button>
    </div>

    <h1>
      { report.title }
      <small>{ report.description }</small>
    </h1>
    <hr/>
    <form-designer-show each={ child in form.children } record={ parent.record } is_root={ true } form_title={ parent.report.name } section={ child } components={ parent.form.components }></form-designer-show>

  </div>

  <script>
    var self = this

    var buildRecord = function(o) {
      var base = o.report.base_profile.fields || {}
      var prof = o.report.profile.fields || {}
      var repo = o.report.fields || {}
      var r = $.extend({}, base, prof)
      $.extend(r, repo)
      return r
    }

    self.report = opts.report || {}
    self.record = buildRecord(opts)
    self.form = self.report.form.form || {}
    self.changed = opts.changed || false

    $(self.record).on('change', function() {
      self.report.fields = self.record
      self.update({ changed: true })
    })

    self.save = function() {
      riot.app.save("reports", self.report, null, function(report) {
        self.update({ report: report, changed: false })
      })
    }

    self.show = function() {
      Popup({ title: self.report.title, body: "<pre>"+JSON.stringify(self.record,null,2)+"</pre>" })
    }
  </script>
</reports-show>
