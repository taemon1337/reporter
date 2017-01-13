<profiles>
  <div class="row">
    <div class="col-xs-12">
      <div class="pull-right">
        <button onclick={ help } type="button" class="btn btn-default">
          What is a profile?
        </button>
        <a href="/#/profiles/new/edit" class="btn btn-primary">
          New Profile
          <span class="fa fa-plus"></span>
        </a>
      </div>

      <h1>Profiles</h1>
    </div>

    <div data-is="riot-table" headers={ headers } records={ profiles } fetch={ fetch } record_buttons={ record_buttons }></div>
  </div>

  <script>
    var self = this
    this.profiles = opts.profiles || []

    this.headers = opts.headers || {
      name: { template: "<a href='/#/profiles/{ _id }'>{ name }</a>" },
      description: {}
    }

    this.record_buttons = opts.record_buttons || [
      { text: "Open", fa: "eye", href: function(record) { return '/#/profiles/'+record._id }},
      { text: "Edit", fa: "pencil", href: function(record) { return '/#/profiles/'+record._id+'/edit' }},
      { text: "Delete", fa: "trash", event: "profile:delete" }
    ]

    this.toggleView = function(e) {
      this.update({ tag: e.target.id })
    }

    this.help = function() {
      var body = ["<h3>A profile is just a bunch of fields to insert into a template<br</h3>"]
      body.push("<small>The selected template should have matching fields inserted in it</small>")
      body.push("<small>And a find/replace will be done using a profile/reports fields key/value</small>")
      Popup({ title: "What is a profile?", body: body.join('<br>') })
    }

    this.fetch = function(cb) { riot.app.fetch("profiles", null, null, cb) }

    this.on('profile:delete', function(record) {
      var a = confirm('Are you sure you want to delete ' + record.name + '?')
      if(a) {
        riot.app.delete('profiles', record, null, function() {
          self.tags['riot-table'].reload()
        })
      }
    })
  </script>
</profiles>
