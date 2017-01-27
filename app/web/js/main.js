riot.compile(function() {
  var currentTag = null;
  var currentNav = null;
  var app = riot.app = new App();
  var tabs = [
    { text: "Inbox", href: "/inbox/", url: true },
    { text: "Evidence Vault", href: "/evidence-vault/", url: true },
    { text: "Working Library", href: "/working-library/", url: true },
    { text: "Outbox", href: "/outbox/", url: true },
    { text: "Reporter", href: "/reporter/", url: true },
    { text: "Cases", href: "/caser/", url: true }
  ]

  function mountNavbar(opts) {
    currentNav && currentNav.unmount(true)
    currentNav = riot.mount('#navbar', 'navbar', opts)[0]
  }

  function mount(tag, opts) {
    mountNavbar({ tabs: "designs,profiles,reports" })
    currentTag && currentTag.unmount(true)
    currentTag = riot.mount('#main', tag, opts)[0]
  }

  /*
   * /users         ->  mount('users', { users: [] })
   * /users/1       ->  mount('users-show', { user: user })
   * /users/1/edit  ->  mount('users-edit', { user: user })
   * /users/new     ->  mount('users-new', { user: {} })
   */
  function resourceHandler(collection, id, action) {
    var singular = collection.slice(0,-1);
    var opts = {};
    var tag = id ? [collection,action || 'show'].join('-') : collection;

    app.fetch(collection, id, action, function(resp) {
      opts[id ? singular : collection] = resp;
      mount(tag, opts);
    })
  }

  var routes = {
    forms: resourceHandler,
    profiles: resourceHandler,
    reports: resourceHandler
  };

  function handler(collection, id, action) {
    if(collection === 'designs') { collection = 'forms' }
    collection = collection || 'reports';
    var fn = routes[collection]
    fn ? fn(collection, id, action) : console.error("No route found: ", collection, id, action)
  }

  riot.mount('*')
  route(handler)
  route.start(true);
});
