<template>
  <div>
    <tiny-mce :name='name' :value='value' @input='emitInput'></tiny-mce>
  </div>
</template>

<script>
  import TinyMce from 'sf/components/TinyMce'

  export default {
    name: 'HtmlEditor',
    props: {
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
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
    components: {
      TinyMce
    }
  }
</script>
