<template>
  <div>
    <span v-for="(val, key) in obj" key='key'>
      <v-layout row v-if='isFieldType(val.type)'>
        <v-flex xs12>
          <h6>{{ labelize(val, key) | capitalize }}</h6>
          <component :is='val.tag' :name='key' :value='getFieldValue(key)' :placeholder='"enter " + labelize(val, key) + "..."' @input='inputChanged'></component>
        </v-flex>
      </v-layout>
    </span>
  </div>
</template>

<script>
  import TextInput from 'sf/components/TextInput'
  import TextBox from 'sf/components/TextBox'
  import HtmlEditor from 'sf/components/HtmlEditor'

  export default {
    name: 'SchemaTree',
    props: {
      value: {
        type: Object,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      obj: {
        type: [Object, Array, String],
        required: true
      }
    },
    data () {
      return {}
    },
    methods: {
      isFieldType (type) {
        return type && type !== 'object' && type !== 'array'
      },
      labelize (val, name) {
        return val.label || val.name || name
      },
      inputChanged (val, key) {
        console.log(key + ' changed to ' + val)
        this.value[key] = val
        this.$emit('input', this.value)
      },
      getFieldValue (key) {
        return this.value[key] || ''
      }
    },
    components: {
      TextInput,
      TextBox,
      HtmlEditor
    }
  }
</script>
