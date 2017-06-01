<template>
  <textarea v-bind:value='json' @change='updateValue' rows='32' style='width:100%;'></textarea>
</template>

<script>
  import { parseJson } from '@/lib/parse-json'

  export default {
    name: 'RawJson',
    props: {
      value: {
        required: true
      }
    },
    data () {
      return {}
    },
    computed: {
      json () {
        return JSON.stringify(this.value, null, 2)
      }
    },
    methods: {
      updateValue (e) {
        let json = parseJson(e.target.value, null)
        if (json) {
          this.$emit('input', json)
        }
      }
    }
  }
</script>
