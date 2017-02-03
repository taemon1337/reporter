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

        <form-group label="Select Base Profile">
          <select-option default="--select base--" current={ parent.report.base_profile._id }  fetch={ parent.fetch_profiles } field="base_profile" option_text="name"></select-option>
        </form-group>

        <form-group label="Select Profile">
          <select-option default="--select profile--" current={ parent.report.profile._id } fetch={ parent.fetch_profiles } option_text="name" field="profile"></select-option>
        </form-group>

        <form-group label="Select Form">
          <select-option default="--select form--" current={ parent.report.form._id } fetch={ parent.fetch_forms } option_text="name" field="form"></select-option>
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
    this.report = opts.report || {}

    this.save = function(e) {
      e.preventDefault()
      riot.app.save("reports", self.report, null, function(record) {
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

    this.fetch_forms = function(cb) {
      riot.app.fetch("forms", null, null, cb)
    }

    this.on('option:selected', function(data) {
      self.report[data.field] = data.value
    })

    this.cancel = function() {
      window.history.back()
    }
  </script>
</reports-edit>
