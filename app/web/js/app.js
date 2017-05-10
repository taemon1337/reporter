(function($) {

  function App(opts) {
    opts = opts || {};
    riot.observable(this);
    this.base = opts.base || "./api";
    this._cache = opts._cache || {};
  }

  App.prototype = {
    save: function(collection, record, overrides, cb) {
      var self = this;
      var headers = record._id ? { "If-Match": record._etag } : {};
      var data = {};
      Object.keys(record)
        .filter(function(k) { return !k.startsWith("_") })
        .forEach(function(key) {
          if(collection === "reports" && ['base_profile','profile','form'].indexOf(key) >= 0) {
            if(typeof(record[key]) !== 'string') {
              data[key] = record[key]._id
            } else {
              data[key] = record[key]
            }
          } else if(collection === "forms" && key === "file") {
            // skip
          } else {
            data[key] = record[key]
          }
        });

      var options = $.extend({}, {
        url: [self.base,collection,record._id].join('/').replace('//','/'),
        method: record._id ? "PATCH" : "POST",
        dataType: "json",
        contentType: "application/json",
        headers: headers,
        data: JSON.stringify(data)
      }, overrides);

      $.ajax(options).then(function(resp) {
        var parsed = self.parse(resp);
        for(var attr in parsed) { record[attr] = parsed[attr]; }
        self.notice.saved(record)
        cb(record)
      });
    },
    notice: {
      saved: function(record) {
        Alert({
          title: "Success!",
          body: "'"+(record.title || record.name || record._id) + "' was saved at " + record._updated,
          color: "success",
          classes: "col-xs-3"
        })
      }
    },
    delete: function(collection, record, overrides, cb) {
      var self = this;
      var headers = record._id ? { "If-Match": record._etag } : {};

      var options = $.extend({}, {
        url: [self.base,collection,record._id].join('/').replace('//','/'),
        method: "DELETE",
        dataType: "json",
        contentType: "application/json",
        headers: headers
      }, overrides);

      $.ajax(options).then(function(resp) { cb(self.parse(resp)) })
      .catch(cb);
    },
    fetch: function(collection, id, action, cb) {
      if(id === 'new') {
        if(collection === "reports") {
          return cb({ base_profile: {}, profile: {}, form: {} })
        } else {
          return cb({})
        }
      }
      var self = this;
      var url = [self.base,collection,id].join('/').replace('//','/');
      $.get(url).then(function(resp) {
        cb(self.parse(resp, collection));
      }).catch(function(err) {
        console.warn("Fetch Error: ", err);
      })
    },
    cache: function(path, cb) {
      var self = this;
      if(self._cache[path]) {
        cb(self._cache[path]);
      } else {
        $.get(self.base+path).then(function(resp) {
          self._cache[path] = self.parse(resp);
          cb(self._cache[path]);
        });
      }
    },
    parse: function(resp, collection) {
      if(!resp) {
        return resp;
      } else if(resp._items) {
        var records = [];
        for(var i=0; i<resp._items.length; i++) {
          var rec = resp._items[i]
          if(collection === 'forms') {
            rec.profile = rec.profile || {};
          }
          if(collection === 'reports') {
            ["base_profile","profile","form"].forEach(function(key) { rec[key] = rec[key] || {} })
          }
          records.push(rec);
        }
        return records;
      } else {
        if(collection === 'reports') {
          ["base_profile","profile","form"].forEach(function(key) {
            resp[key] = resp[key] || {};
          })
        }
        return resp;
      }
    }
  };

  window.App = App;
})($);
