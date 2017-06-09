<template>
  <div>
    <div v-if="valid" class='green--text'>
      <v-icon class='green--text'>check_circle</v-icon>{{ message }}
    </div>
    <div v-else>
      <v-alert error value='true'>
        <ul>
          <li v-for='(err, i) in errors' key='i'>{{ err.message }}</li>
        </ul>
      </v-alert>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AjvErrors',
    props: {
      valid: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        default: 'The schema is valid'
      },
      errors: {
        type: Array,
        default () { return [] }
      }
    },
    data () {
      return {}
    }
  }
</script>
