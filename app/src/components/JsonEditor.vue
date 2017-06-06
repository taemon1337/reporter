<template>
  <div ref='editor' style='height:500px;'></div>
</template>

<script>
  import 'jsoneditor/dist/jsoneditor.css'
  import JsonEditor from 'jsoneditor/dist/jsoneditor-minimalist.js'
  import Ajv from 'ajv'

  export default {
    name: 'JsonEditor',
    props: {
      value: {
        required: true
      },
      opts: {
        default () {
          return {
            ajv: new Ajv({ allErrors: true }),
            mode: 'tree',
            modes: ['tree', 'text', 'view']
          }
        }
      },
      background: {
        default: ''
      }
    },
    data () {
      return {}
    },
    mounted () {
      let self = this
      this.editor = new JsonEditor(this.$refs.editor, this.opts, this.value)

      if (this.editor) {
        let cls = this.editor.contentOuter.parentElement.children[0].className
        this.editor.contentOuter.parentElement.children[0].className = cls + ' ' + this.background
      }

      this.editor.options.onChange = function () {
        self.$emit('input', self.editor.get())
      }
    }
  }
</script>

<style scoped>
  .jsoneditor-menu {
    background-color: #e8e8e8;
  }  
</style>
