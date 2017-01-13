<profiles-show>
  <div class="form-horizontal col-xs-12">
    <div class="pull-right">
      <a href="/#/profiles/{ profile._id }/edit" class="btn btn-primary">Edit</a>
    </div>

    <h1>
      { profile.name }
      <small>{ profile.description }</small>
    </h1>
    <hr/>
    <h3>Profile Fields</h3>

    <form-group label="Fields">
      <div class="input-group">
        <input onkeyup={ parent.keyup } type="text" class="form-control" placeholder="add field...">
        <span class="input-group-btn">
          <button onclick={ parent.addField } type="button" class="btn btn-primary">
            <span class="fa fa-plus"></span>
          </button>
        </span>
      </div>
    </form-group>
    <key-value-inputs fields={ profile.fields }></key-value-inputs>

  </div>

  <script>
    var self = this
    self.profile = opts.profile

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

    self.on('fields:changed', function(data) {
      if(data.fields) {
        self.profile.fields = data.fields
        riot.app.save("profiles", self.profile,{ method: "PUT" }, function(resp) {
          self.update({ profile: resp })
        })
      }
    })
  </script>
</profiles-show>
