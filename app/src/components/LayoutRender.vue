<template>
  <div id='previewElement' style='width:100%;height:500px;'></div>
</template>

<script>
  import jsreport from 'jsreport-browser-client-dist/jsreport.js'

  jsreport.serverUrl = '/templates'

  export default {
    name: 'LayoutRender',
    props: {
      layout: {
        type: String,
        required: true
      },
      value: {
        type: Object,
        default () {
          return null
        }
      },
      recipe: {
        type: String,
        default: 'html',
        validator: function (val) {
          return ['phantom-pdf', 'html', 'html-with-browser-client'].indexOf(val) >= 0
        }
      }
    },
    methods: {
      render (template, data, recipe) {
        window.template = template
        if (!data) {
          template = '<html><body><div style="border:1px solid blue;">' + template + '</div></body></html>'
          template = template.replace(/{{/g, '<span style="background-color:#e8e8e8;">\\{{').replace(/}}/g, '}}</span>')
        }
        let request = {
          template: {
            content: template,
            engine: 'handlebars',
            recipe: recipe
          },
          data: data
        }

        jsreport.render('previewElement', request)
      }
    },
    mounted () {
      console.log('rendering...')
      this.render(this.layout, this.value, this.recipe)
    },
    updated () {
      console.log('rendering...')
      this.render(this.layout, this.value, this.recipe)
    },
    data () {
      return {}
    }
  }
</script>
