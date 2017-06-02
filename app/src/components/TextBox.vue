<template>
  <div class="input-group--focused input-group input-group--dark input-group--text-field">
    <label>{{ label }}</label>
    <div class='input-group__input'>
      <textarea :value='value' :rows='rows' :placeholder='placeholder' @input='inputChanged'></textarea>
    </div>
    <div class="input-group__details"><div class="input-group__messages"></div></div>
  </div>
</template>

<script>
  export default {
    name: 'TextBox',
    props: {
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rows: {
        type: Number,
        default () {
          return 6
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
      inputChanged (e) {
        this.$emit('input', e.target.value, this.name)
      }
    }
  }
</script>

<style>
  textarea {
    resize: none;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }  
</style>
