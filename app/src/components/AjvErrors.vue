<template>
  <div>
    <v-alert success v-bind:value="validSchema">The schema is valid Json Schema</v-alert>
    <v-alert error v-bind:value="!validSchema">Invalid Schema Definition {{ error }}</v-alert>
  </div>
</template>

<script>
  import Ajv from 'ajv'

  export default {
    name: 'AjvErrors',
    props: {
      model: {
        required: true
      }
    },
    data () {
      return {
        error: null
      }
    },
    computed: {
      validSchema () {
        let schema = this.model

        try {
          this.ajv.compile(schema)
        } catch (err) {
          this.error = err
          return false
        }
        return true
      }
    },
    created () {
      this.ajv = new Ajv({ allErrors: true })
    }
  }
</script>
