<templates>
  <div class="row">
    <div class="col-xs-12">
      <div class="pull-right">
        <button onclick={ help } type="button" class="btn btn-default">
          What is a template?
        </button>
        <a href="/#/templates/new/edit" class="btn btn-primary">
          New Template
          <span class="fa fa-plus"></span>
        </a>
      </div>

      <h1>Templates</h1>
    </div>

    <div data-is="riot-table" headers={ headers } records={ templates } fetch={ fetch } record_buttons={ record_buttons }></div>
  </div>

  <script>
    var self = this
    this.templates = opts.templates || []

    this.headers = opts.headers || {
      name: { template: "<a href='/#/templates/{ _id }'>{ name }</a>" },
      description: { template: "{ description.length > 100 ? description.split(' ').slice(0,15).join(' ')+'...' : description }" }
    }

    this.record_buttons = opts.record_buttons || [
      { text: "Open", fa: "eye", href: function(record) { return '/#/templates/'+record._id }},
      { text: "Edit", fa: "pencil", href: function(record) { return '/#/templates/'+record._id+'/edit' }},
      { text: "Delete", fa: "trash", event: "template:delete" }
    ]

    this.toggleView = function(e) {
      this.update({ tag: e.target.id })
    }

    this.fetch = function(cb) { riot.app.fetch("/templates", null, null, cb) }

    this.help = function() {
      var body = ["<h3>A template is a Office Document that you upload.<br</h3>"]
      body.push("<small>Just put a '{%r TAG_NAME %}' where you want to replace content,")
      body.push("then use a profile and/or a report field of the same TAG_NAME")
      body.push("which will replace the tag with the given content.</small>")
      body.push("<p>This uses <a target='_blank' href='http://docxtpl.readthedocs.io/'>python-docx-template</a> under the hood</p>");
      Popup({ title: "What is a template?", body: body.join('<br>') })
    }

    this.on('template:delete', function(record) {
      var a = confirm('Are you sure you want to delete Case ' + record.title + '?')
      if(a) {
        riot.app.delete('/templates', record, null, function() {
          self.tags['riot-table'].reload()
        })
      }
    })
  </script>
</templates>
