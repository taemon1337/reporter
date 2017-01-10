<reports-edit>
  <div class="row">
    <div class="col-xs-12">
      <form onsubmit={ save } class="form-horizontal">
        <form-group label="Id">
          <input type="text" readonly class="form-control" value={ parent.report._id }>
        </form-group>

        <form-group label="Title">
          <input onchange={ parent.fieldChange } type="text" class="form-control" placeholder="report title or issue number..." name="title" value={ parent.report.title }>
        </form-group>

        <form-group label="Description">
          <textarea onchange={ parent.fieldChange } class="form-control" rows=4 name="description" placeholder="summary or description">{ parent.report.description }</textarea>
        </form-group>

        <form-group label="Select Profile">
          <select-option default="--select profile--" fetch={ parent.fetch_profiles } option_value="name" option_text="name" record={ parent.report } field="profile"></select-option>
        </form-group>

        <form-group label="Select Template">
          <select-option default="--select template--" fetch={ parent.fetch_templates } option_value="name" option_text="name" record={ parent.report } field="template"></select-option>
        </form-group>

        <form-group>
          <button type="submit" class="btn btn-primary">Save</button>
          <button onclick={ parent.cancel } type="button" class="btn btn-default">Cancel</button>
        </form-group>
      </form>
    </div>
  </div>

  <script>
    var self = this
    this.report = opts.report

    this.save = function(e) {
      e.preventDefault()
      riot.app.save("/reports", self.report, null, function(record) {
        console.log("SAVED: ", record)
        self.update({ report: record })
      })
    }

    this.fieldChange = function(e) {
      self.report[e.target.name] = $(e.target).val()
      self.update({ report: self.report })
    }

    this.fetch_profiles = function(cb) {
      riot.app.fetch("profiles", null, null, cb)
    }

    this.fetch_templates = function(cb) {
      riot.app.fetch("templates", null, null, cb)
    }

    this.on('option:selected', function(data) {
      console.log("option selected", data)
      var d = {}
      d[data.field] = data.value
      self.update(d)
    })

    this.cancel = function() {
      window.history.back()
    }
  </script>
</reports-edit>
