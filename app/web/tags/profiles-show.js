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
    <form-tree field="profile-fields" object={ profile.fields }></form-tree>

  </div>

  <script>
    var self = this
    self.profile = opts.profile

    self.on('tree:change', function(data) {
      self.profile.fields = data.object
      riot.app.save("profiles", self.profile, { method: "PUT" }, function(resp) {
        for(var key in resp) { self.profile[key] = resp[key] }
        self.update({ profile: self.profile })
      })
    })
  </script>
</profiles-show>
