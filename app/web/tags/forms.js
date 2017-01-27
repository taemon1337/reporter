<forms>
  <div class="row">
    <div class="col-xs-12">
      <div class="pull-right">
        <button onclick={ help } type="button" class="btn btn-default">
          What is a form design?
        </button>
        <a href="./#/forms/new/edit" class="btn btn-primary">
          Design Form
          <span class="fa fa-plus"></span>
        </a>
      </div>

      <h1>Form Designs</h1>
    </div>

    <div data-is="riot-table" headers={ headers } records={ forms } fetch={ fetch } record_buttons={ record_buttons }></div>
  </div>

  <script>
    var self = this
    this.forms = opts.forms || []

    this.headers = opts.headers || {
      name: { template: "<a href='./#/forms/{ _id }'>{ name }</a>" },
      grouping: { template: "{ hashColorLabel(grouping) }" },
      description: { template: "{ description.length > 100 ? description.split(' ').slice(0,15).join(' ')+'...' : description }" },
    }

    this.record_buttons = opts.record_buttons || [
      { text: "Open", fa: "eye", href: function(record) { return './#/forms/'+record._id }},
      { text: "Edit", fa: "pencil", href: function(record) { return './#/forms/'+record._id+'/edit' }},
      { text: "Delete", fa: "trash", event: "template:delete" }
    ]

    this.toggleView = function(e) {
      this.update({ tag: e.target.id })
    }

    this.fetch = function(cb) { riot.app.fetch("forms", null, null, cb) }

    this.help = function() {
      var body = ["<h3>A form design consists of a html web form and a template document.</h3>"]
      body.push("<p>The web form will design what fields need to be completed in order to complete the document.</p>")
      body.push("<p>The template document should be a .odt file which contains placeholders which the completed form will replace.</p>")
      Popup({ title: "What is a template?", body: body.join('<br>') })
    }

    this.on('template:delete', function(record) {
      var a = confirm('Are you sure you want to delete Case ' + record.title + '?')
      if(a) {
        riot.app.delete('forms', record, null, function() {
          self.tags['riot-table'].reload()
        })
      }
    })
  </script>
</forms>
