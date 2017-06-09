<template>
  <textarea :id="id"></textarea>
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

  export default {
    name: 'TinyMce',
    props: {
      id: {
        type: String,
        default () { return Math.random().toString().slice(2) }
      },
      name: {
        type: String,
        required: true
      },
      value: {
        type: String,
        default: '<h1>Hello World</h1>'
      },
      options: {
        type: Object,
        default () {
          return {
            plugins: plugins.join(' '),
            allow_conditional_comments: false
          }
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      emitInput (val) {
        this.$emit('input', val, this.name)
      }
    },
    mounted () {
      let self = this
      let setup = function (editor) {
        editor.on('init', function (e) {
          tinymce.get(self.id).setContent(self.value)
        })
        editor.on('change', (e) => self.emitInput(tinymce.get(self.id).getContent()))
      }
      let opts = Object.assign({}, this.options, { selector: '#' + this.id, setup: setup })
      process.nextTick(() => tinymce.init(opts))
    },
    destroyed () {
      tinymce.execCommand('mceRemoveEditor', false, this.id)
    }
  }
</script>
