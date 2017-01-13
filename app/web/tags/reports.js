<reports>
  <div class="row">
    <div class="col-xs-12">
      <div class="pull-right">
        <a href="/#/reports/new/edit" class="btn btn-primary">
          New Report
          <span class="fa fa-plus"></span>
        </a>
      </div>

      <h1>Reports</h1>
    </div>

    <riot-table headers={ headers } records={ reports } fetch={ fetch } record_buttons={ record_buttons }></riot-table>
  </div>

  <script>
    var self = this
    this.reports = opts.reports || []

    this.headers = opts.headers || {
      title: { template: "<a href='/#/reports/{ _id }'>{ title }</a>" },
      description: {},
      template: { template: "<a href='/#/templates/{ template._id }'>{ template.name }</a>" },
      profile: { template: "<a href='/#/profiles/{ profile ? profile._id : '' }'>{ profile ? profile.name : '' }</a>" },
      base_profile: { text: "BASE PROFILE", template: "<a href='/#/profiles/{ base_profile ? base_profile._id : '' }'>{ base_profile ? base_profile.name : '' }</a>" }
    }

    this.record_buttons = opts.record_buttons || [
      { text: "Open", fa: "eye", href: function(record) { return '/#/reports/'+record._id }},
      { text: "Edit", fa: "pencil", href: function(record) { return '/#/reports/'+record._id+'/edit' }},
      { text: "Delete", fa: "trash", event: "report:delete" },
      { text: "Download", fa: "download", href: function(record) { return "/api/reports/"+record._id+"/download" }}
    ]

    this.toggleView = function(e) {
      this.update({ tag: e.target.id })
    }

    this.fetch = function(cb) { riot.app.fetch("reports", null, null, cb) }

    this.on('report:delete', function(record) {
      var a = confirm('Are you sure you want to delete ' + record.title + '?')
      if(a) {
        riot.app.delete('reports', record, null, function() {
          self.tags['riot-table'].reload()
        })
      }
    })
  </script>
</reports>
