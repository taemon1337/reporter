<template>
  <v-text-field class="input-group--focused" :value='value' :type='type' :placeholder='placeholder' :label='label' @input='inputChanged'></v-text-field>
</template>

<script>
  export default {
    name: 'TextInput',
    props: {
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default () {
          return 'text'
        }
      },
      label: {
        type: String
      },
      placeholder: {
        type: String
      }
    },
    data () {
      return {}
    },
    methods: {
      inputChanged (val) {
        this.$emit('input', val, this.name)
      }
    }
  }
</script>
