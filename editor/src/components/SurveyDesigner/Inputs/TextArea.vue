<template>
  <md-input-container>
    <label v-if="label">{{ label }}</label>
    <md-textarea @input='onInput' :value='value' :required='required' :disabled='disabled' :placeholder='placeholder'></md-textarea>
  </md-input-container>
</template>

<script>
  export default {
    name: 'TextArea',
    props: {
      value: {
        required: true
      },
      label: {
        type: String
      },
      required: {
        type: Boolean,
        default () {
          return false
        }
      },
      disabled: {
        type: Boolean
      },
      placeholder: {
        type: String
      }
    },
    data () {
      return {}
    },
    methods: {
      onInput (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
