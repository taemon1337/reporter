<profiles-edit>
  <div class="row">
    <div class="col-xs-12">
      <form onsubmit={ save } class="form-horizontal">
        <form-group label="Id">
          <input type="text" readonly class="form-control" value={ parent.profile._id }>
        </form-group>

        <form-group label="Name">
          <input onchange={ parent.fieldChange } type="text" class="form-control" placeholder="profile name..." name="name" value={ parent.profile.name }>
        </form-group>

        <form-group label="Description">
          <textarea onchange={ parent.fieldChange } class="form-control" rows=4 name="description" placeholder="enter description...">{ parent.profile.description }</textarea>
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
    this.profile = opts.profile || {}

    this.save = function(e) {
      e.preventDefault()
      riot.app.save("/profiles", self.profile, null, function(record) {
        console.log("SAVED: ", record)
        self.update({ profile: record })
      })
    }

    this.fieldChange = function(e) {
      self.profile[e.target.name] = $(e.target).val()
      self.update({ profile: self.profile })
    }

    this.addField = function(e) {
      var input = $(e.target).parents('.input-group').find('input')
      self.tags['key-value-inputs'].trigger('add', { key: input.val() })
      setTimeout(function() { input.val('') }, 900)
    }

    this.on('fields:changed', function(data) {
      if(data.fields) {
        self.profile.fields = data.fields
      }
    })

    this.cancel = function() {
      window.history.back()
    }
  </script>
</profiles-edit>
