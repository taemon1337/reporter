<profiles-show>
  <div class="col-xs-12">
    <h1>{ profile.name }</h1>
    <small>{ profile.description }</small>
    <hr/>

    <h3>Form Fields</h3>
    <pre>{ JSON.stringify(profile.fields, null, 4) }</pre>

  </div>

  <script>
    this.profile = opts.profile
  </script>
</profiles-show>
