<template>
  <div ref='editor' style='height:500px;'></div>
</template>

<script>
  import debounce from 'debounce'
  import 'jsoneditor/dist/jsoneditor.css'
  import JsonEditor from 'jsoneditor/dist/jsoneditor-minimalist.js'
  import Ajv from 'ajv'
  import { mapGetters } from 'vuex'
  import { SchemeTypes } from '@/store/mutation-types'

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
    computed: {
      ...mapGetters({
        schema: SchemeTypes.validation
      })
    },
    watch: {
      value () {
        if (this.editor) {
          this.editor.set(this.value) // ISSUE: changed triggered but UI refreshes and input focus is lost
          this.editor.expandAll()
        }
      }
    },
    mounted () {
      let self = this
      this.editor = new JsonEditor(this.$refs.editor, this.opts, this.value)

      if (this.editor) {
        let cls = this.editor.contentOuter.parentElement.children[0].className
        this.editor.contentOuter.parentElement.children[0].className = cls + ' ' + this.background
      }

      this.editor.options.onChange = debounce(function () {
        let val = self.editor.get()
        self.$emit('input', val)
      }, 1400)
    }
  }
</script>

<style scoped>
  .jsoneditor-menu {
    background-color: #e8e8e8;
  }  
</style>
