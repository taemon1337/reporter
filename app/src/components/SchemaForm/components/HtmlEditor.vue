<template>
  <div>
    <tinymce id="editor" :value="value" :options="options" @input="emitInput" :content='content'></tinymce>
  </div>
</template>

<script>
  import tinymce from 'tinymce'

  let plugins = [
    'advlist',
    'charmap',
    'emoticons',
    'imagetools',
    'media',
    'print',
    'template',
    'wordcount',
    'anchor',
    'code',
    'fullpage',
    'importcss',
    'nonbreaking',
    'save',
    'textcolor',
    'autolink',
    'codesample',
    'fullscreen',
    'insertdatetime',
    'noneditable',
    'searchreplace',
    'textpattern',
    'autoresize',
    'colorpicker',
    'help',
    'legacyoutput',
    'pagebreak',
    'spellchecker',
    'toc',
    'autosave',
    'contextmenu',
    'hr',
    'link',
    'paste',
    'tabfocus',
    'visualblocks',
    'bbcode',
    'directionality',
    'image',
    'lists',
    'preview',
    'table',
    'visualchars'
  ]

  window.tinymce = tinymce

  export default {
    name: 'HtmlEditor',
    props: {
      options: {
        type: Object,
        default () {
          return {
            plugins: plugins.join(' '),
            allow_conditional_comments: false
          }
        }
      },
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      content: {
        type: String,
        default: '<h1>Hello World</h1>'
      }
    },
    data () {
      return {}
    },
    methods: {
      emitInput (val) {
        this.$emit('input', val, this.name)
      }
    }
  }
</script>
