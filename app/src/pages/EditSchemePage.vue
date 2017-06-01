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
        <schema-form :schema='scheme_schema' :value='scheme' @input='saveRecord'></schema-form>
      </v-tabs-content>
      <v-tabs-content id='jsoneditor'>
        <json-editor :value='scheme.schema_json' @input='saveSchema'></json-editor>
      </v-tabs-content>
      <v-tabs-content id='schematable'>
        <schema-table :value='scheme.schema_json' @input='saveSchema'></schema-table>
      </v-tabs-content>
    </v-tabs>
    <ajv-errors :model='cache'></ajv-errors>
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
              type: 'string'
            },
            description: {
              type: 'string'
            }
          },
          required: ['name']
        },
        cache: {
          schema_json: {}
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
        console.log('SAVE RECORD CALLED: ', record)
      },
      saveSchema (schema) {
        console.log('SAVE SCHEMA CALLED: ', schema)
      }
    },
    mounted () {
      console.log('MOUNTED', this.$route.params)
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
