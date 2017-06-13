<template>
  <div>
    <span v-for="(val, key) in properties" key='key'>
      <v-layout row v-if='isFieldType(val.type)'>
        <v-flex xs12>
          <h6>{{ labelize(val, key) | capitalize }}</h6>
          <component :is='val.tag' :name='key' :value='getFieldValue(key)' :placeholder='"enter " + labelize(val, key) + "..."' v-bind='val.tag_options' @input='inputChanged'></component>
        </v-flex>
      </v-layout>
      <v-layout row v-else-if="val.tag">
        <v-flex xs12>
          <h6>{{ labelize(val, key) | capitalize }}</h6>
          <component :is='val.tag' :name='key' :value='getFieldValue(key)' :placeholder='"enter " + labelize(val, key) + "..."' v-bind='val.tag_options' @input='inputChanged'></component>
        </v-flex>
      </v-layout>
      <v-layout row v-else-if="val.type === 'object' && val.properties">
        <v-container fluid style='padding:5px 25px;'>
          <h6>{{ labelize(val, key) | capitalize }}</h6>
          <schema-tree name='properties' :properties='val.properties' :value='value'></schema-tree>
        </v-container>
      </v-layout>
    </span>
  </div>
</template>

<script>
  import SchemaForm from 'sf/SchemaForm'
  import TextInput from 'sf/components/TextInput'
  import TextBox from 'sf/components/TextBox'
  import HtmlEditor from 'sf/components/HtmlEditor'
  import SchemaSelect from 'sf/components/SchemaSelect'
  import MultiSelect from 'sf/components/MultiSelect'
  import DefinitionsForm from 'sf/components/DefinitionsForm'

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
      properties: {
        type: Object,
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
      HtmlEditor,
      MultiSelect,
      SchemaSelect,
      SchemaForm,
      DefinitionsForm
    }
  }
</script>
