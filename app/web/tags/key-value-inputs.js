<key-value-inputs>
  <div each={ key in Object.keys(fields) }>
    <form-group label={ key }>
      <div class="input-group">
        <input onchange={ parent.changed } type="text" id={ label } name={ label } value={ parent.fields[label] } class="form-control">
        <span class="input-group-btn">
          <button onclick={ parent.removeField } type="button" class="btn btn-danger">
            <span class="fa fa-remove"></span>
          </button>
        </span>
      </div>
    </form-group>
  </div>

  <script>
    var self = this
    self.fields = opts.fields || {}

    self.removeField = function(e) {
      var input = $(e.target).parents('.input-group').find('input')
      window.input = input
      delete self.fields[input.attr('name')]
      self.parent.trigger("fields:changed", { fields: self.fields })
      self.update({ fields: self.fields })
    }

    self.changed = function(e) {
      self.fields[e.target.name] = e.target.value
      self.parent.trigger('fields:changed', { fields: self.fields })
    }

    self.on('add', function(data) {
      if(data.key) {
        var key = data.key.replace(/\s+/g,'-')
        self.fields[key] = data.value || ''
        self.update({ fields: self.fields })
      }
    })
  </script>
</key-value-inputs>
