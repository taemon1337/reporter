<template>
  <edit-frame :title='computedTitle' :record='scheme' @save='saveRecord' @remove='removeRecord' :color='schemaColor.primary'>
    <div slot='drawer'>
      <about-schema :color='schemaColor.primary'></about-schema>
    </div>
    <div slot='content'>
      <v-tabs light style='min-width:400px;'>
        <v-tabs-bar slot='activators'>
          <v-tabs-slider></v-tabs-slider>
          <v-tabs-item ripple href='#properties'>Properties</v-tabs-item>
          <v-tabs-item ripple href='#jsoneditor'>Editor</v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content id='properties'>
          <v-layout row>
            <v-flex xs12>
              <schema-form :schema='scheme_schema' :value='scheme' @save='saveRecord'></schema-form>
            </v-flex>
          </v-layout>
        </v-tabs-content>
        <v-tabs-content id='jsoneditor'>
          <json-editor :value='scheme.jsonschema' @input='updateSchema' :background='schemaColor.primary'></json-editor>
        </v-tabs-content>
        <v-tabs-content id='schematable'>
          <schema-table :value='scheme.jsonschema' @input='updateSchema'></schema-table>
        </v-tabs-content>
      </v-tabs>
      <ajv-errors :model='scheme.jsonschema'></ajv-errors>
    </div>
  </edit-frame>
</template>

<script>
  import EditFrame from '@/components/EditFrame'
  import JsonEditor from '@/components/JsonEditor'
  import SchemaTable from '@/components/SchemaTable'
  import SchemaForm from 'sf/SchemaForm'
  import AboutSchema from '@/components/About/AboutSchema'
  import AjvErrors from '@/components/AjvErrors'
  import { SchemeTypes, GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import { capitalize } from '@/lib/capitalize'

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
        scheme: SchemeTypes.active,
        schemaColor: GlobalTypes.schemaColor
      }),
      computedTitle () {
        return 'Edit ' + capitalize(this.scheme.name)
      }
    },
    methods: {
      removeRecord () {
        this.$store.dispatch(SchemeTypes.remove, this.scheme)
        process.nextTick(function () { self.$router.back() })
      },
      saveRecord (record) {
        this.$store.dispatch(SchemeTypes.save, Object.assign({}, this.scheme, record))
      },
      updateSchema (schema) {
        this.$store.dispatch(SchemeTypes.save, Object.assign({}, this.scheme, { jsonschema: schema }))
      }
    },
    mounted () {
      this.$store.dispatch(SchemeTypes.find, this.$route.params.id)
    },
    components: {
      EditFrame,
      JsonEditor,
      SchemaTable,
      SchemaForm,
      AjvErrors,
      AboutSchema
    }
  }
</script>
