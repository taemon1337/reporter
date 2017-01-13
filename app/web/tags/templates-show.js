<templates-show>
  <div class="col-xs-12">
    <div class="pull-right">
      <a href="/#/templates/{ template._id }/edit" class="btn btn-primary">Edit</a>
    </div>
    <h1>
      { template.name }
      <small>{ template.description }</small>
    </h1>
    <hr/>
  </div>

  <div class="row">
    <div class="col-xs-6">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="pull-right">
            <i>{ humanFileSize(template.file.length) }</i>
            <a href={ template.file.file } download={ template.file.name } title="Download">
              <span class="fa fa-2x fa-download"></span>
            </a>
          </div>
          <h3 class="panel-title">
            <a href={ template.file.file } title="Download">
              { template.file.name }
            </a>
          </h3>
        </div>
        <div class="panel-body">
          <a href={ template.file }>
            <pre>{ JSON.stringify(template.file,null,4) }</pre>
          </a>
        </div>
      </div>
    </div>
  </div>

  <script>
    this.template = opts.template

    this.on('tree:change', function(data) {
      console.log('TEMPLATE CHANGED: ', data)
    })
  </script>
</templates-show>
