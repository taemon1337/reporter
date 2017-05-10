<key-value-inputs>
  <div each={ key in keys }>
    <div class="form-group">
      <label class="col-xs-3 control-label">{ key }</label>
      <div class="col-xs-5">
        <div class="input-group">
          <input onchange={ changed } type="text" id={ key } name={ key } value={ vals[keys.indexOf(key)] } class="form-control">
          <span class="input-group-btn">
            <button onclick={ removeField } type="button" class="btn btn-danger">
              <span class="fa fa-remove"></span>
            </button>
          </span>
        </div>
      </div>
      <div class="col-xs-4"></div>
    </div>
  </div>

  <script>
    var self = this
    self.keys = opts.keys || Object.keys(opts.fields) || []
    self.vals = opts.vals || Object.values(opts.fields) || []

    self.removeField = function(e) {
      var input = $(e.target).parents('.input-group').find('input')
      var key = input.attr('name')
      var i = self.keys.indexOf(key)
      console.log(input, key, i)
      if(i >= 0) {
        self.keys.splice(i,1)
        self.vals.splice(i,1)
        self.parent.trigger("fields:changed", { fields: self.getFields() })
        self.update({ keys: self.keys, vals: self.vals })
      } else {
        console.log("Cannot find key/val by name: ", key, self.getFields())
      }
    }

    self.getFields = function() {
      var fields = {}
      for(var i=0; i<self.keys.length; i++) { fields[self.keys[i]] = self.vals[i] }
      return fields
    }

    self.changed = function(e) {
      var i = self.keys.indexOf(e.target.name)
      self.vals[i] = e.target.value
      self.parent.trigger('fields:changed', { fields: self.getFields() })
    }

    self.on('add', function(data) {
      if(!data.key.match(/^[$a-zA-Z0-9 _-]+$/)) {
        return Alert({ title: "Invalid Field Name", body: "Only numbers,letters, '_', '.', and '-' characters allowed", classes: "col-xs-4", color: "danger" })
      }
      if(data.key) {
        var key = data.key.replace(/\s+/g,'-')
        self.keys.push(key)
        self.vals.push('')
        self.update({ keys: self.keys, vals: self.vals })
      }
    })
  </script>
</key-value-inputs>
