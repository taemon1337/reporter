<template>
  <div>
    <h3>{{ scheme.name || 'New' }} Scheme</h3>
    <v-tabs light>
      <v-tabs-bar slot='activators'>
        <v-tabs-slider></v-tabs-slider>
        <v-tabs-item ripple href='#properties'>Properties</v-tabs-item>
        <v-tabs-item ripple href='#jsoneditor'>Editor</v-tabs-item>
      </v-tabs-bar>
      <v-tabs-content id='properties'>
        <schema-form :schema='scheme_schema' :value='scheme' @save='saveRecord'></schema-form>
      </v-tabs-content>
      <v-tabs-content id='jsoneditor'>
        <json-editor :value='scheme.jsonschema' @input='saveSchema'></json-editor>
      </v-tabs-content>
      <v-tabs-content id='schematable'>
        <schema-table :value='scheme.jsonschema' @input='saveSchema'></schema-table>
      </v-tabs-content>
    </v-tabs>
    <ajv-errors :model='scheme.jsonschema'></ajv-errors>
  </div>
</template>

<script>
  import JsonEditor from '@/components/JsonEditor'
  import SchemaTable from '@/components/SchemaTable'
  import SchemaForm from '@/components/SchemaForm'
  import AjvErrors from '@/components/AjvErrors'
  import { SchemeTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'EditSchemePage',
    props: ['id'],
    data () {
      return {
        scheme_schema: {
          title: 'Scheme',
          type: 'object',
          properties: {
            name: {
              type: 'string',
              tag: 'text-input'
            },
            description: {
              type: 'string',
              tag: 'text-box'
            }
          },
          required: ['name']
        }
      }
    },
    computed: {
      ...mapGetters({
        scheme: SchemeTypes.active
      })
    },
    methods: {
      saveRecord (record) {
        this.$store.dispatch(SchemeTypes.save, record)
      },
      saveSchema (schema) {
        this.$store.dispatch(SchemeTypes.save, Object.assign({}, this.scheme, { jsonschema: schema }))
      }
    },
    mounted () {
      this.$store.dispatch(SchemeTypes.find, this.$route.params.id)
    },
    components: {
      JsonEditor,
      SchemaTable,
      SchemaForm,
      AjvErrors
    }
  }
</script>
