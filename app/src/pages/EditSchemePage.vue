<template>
  <edit-frame :title='computedTitle' :schema='schemeSchema' :record='scheme' :cache='cache' @save='save' @remove='removeRecord' :color='schemaColor.primary'>
    <div slot='drawer'>
      <about-schema :color='schemaColor.primary'></about-schema>
    </div>
    <div slot='content'>
      <v-tabs light style='min-width:400px;'>
        <v-tabs-bar slot='activators'>
          <v-tabs-slider></v-tabs-slider>
          <v-tabs-item ripple href='#properties'>Properties</v-tabs-item>
          <v-tabs-item ripple href='#schematable'>Easy Editor</v-tabs-item>
          <v-tabs-item ripple href='#jsoneditor'>Editor</v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content id='properties'>
          <v-layout row>
            <v-flex xs12>
              <schema-form :schema='schemeSchema' v-model='cache' @input='saveRecord'></schema-form>
            </v-flex>
          </v-layout>
        </v-tabs-content>
        <v-tabs-content id='jsoneditor'>
          <json-editor :value='cache.jsonschema' @input='updateSchema' :background='schemaColor.primary'></json-editor>
        </v-tabs-content>
        <v-tabs-content id='schematable'>
          <!--<schema-table :value='cache.jsonschema' @input='updateSchema'></schema-table>-->
        </v-tabs-content>
      </v-tabs>
    </div>
    <div slot='footer'>
      <ajv-errors :valid='validJsonSchema' message='This schema is valid JSON schema' :errors='schemaValidator.errors'></ajv-errors>
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
  import Ajv from 'ajv'
  import { SchemeTypes, GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import { capitalize } from '@/lib/capitalize'

  export default {
    name: 'EditSchemePage',
    props: ['id'],
    data () {
      return {
        schemaValidator: new Ajv({ allErrors: true }),
        cache: {}
      }
    },
    computed: {
      ...mapGetters({
        defaultSchema: SchemeTypes.defaultSchema,
        schemeSchema: SchemeTypes.schemeSchema,
        validationSchema: SchemeTypes.validationSchema,
        scheme: SchemeTypes.active,
        schemaColor: GlobalTypes.schemaColor
      }),
      computedTitle () {
        return 'Edit ' + capitalize(this.scheme.name)
      },
      validJsonSchema () {
        return this.schemaValidator.validate(this.validationSchema, this.cache.jsonschema)
      }
    },
    methods: {
      removeRecord () {
        this.$store.dispatch(SchemeTypes.remove, this.scheme)
        process.nextTick(function () { self.$router.back() })
      },
      save () {
        let self = this
        process.nextTick(function () {
          if (self.validJsonSchema) {
            self.$store.dispatch(SchemeTypes.save, self.cache)
          }
        })
      },
      saveRecord (record) {
        for (let key in record) {
          if (record.hasOwnProperty(key)) {
            if (key !== 'jsonschema') {
              this.cache[key] = record[key]
            }
          }
        }
        // this.save()
      },
      updateSchema (schema) {
        this.cache.jsonschema = schema
        // this.save()
      }
    },
    mounted () {
      this.cache = Object.assign({}, this.scheme)
      this.$store.dispatch(SchemeTypes.findAll)
      this.$store.dispatch(SchemeTypes.find, this.$route.params.id)
    },
    watch: {
      scheme () {
        this.cache = Object.assign({}, this.scheme)
      }
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
