<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="primary white--text">
        <v-card-text>
          <v-card-row>
            <v-btn icon light @click.native='$router.back' v-tooltip='{ "html": "Go back" }'>
              <v-icon>keyboard_backspace</v-icon>
            </v-btn>
            <v-card-title>{{ scheme.name || 'New' | uppercase }} SCHEMA</v-card-title>
            <v-menu bottom left offset-y>
              <v-btn icon="icon" slot="activator" light>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-item>
                  <v-list-tile>
                    <v-list-tile-title @click='removeRecord'>Delete</v-list-tile-title>
                  </v-list-tile>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-row>
        </v-card-text>
      </v-card>
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
          <json-editor :value='scheme.jsonschema' @input='updateSchema'></json-editor>
        </v-tabs-content>
        <v-tabs-content id='schematable'>
          <schema-table :value='scheme.jsonschema' @input='updateSchema'></schema-table>
        </v-tabs-content>
      </v-tabs>
      <ajv-errors :model='scheme.jsonschema'></ajv-errors>
    </v-flex>
  </v-layout>
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
      removeRecord () {
        let self = this
        let a = confirm('Are you sure you want to remove the ' + this.scheme.name + ' scheme?')
        if (a) {
          this.$store.dispatch(SchemeTypes.remove, this.scheme)
          process.nextTick(function () {
            self.$router.back()
          })
        }
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
      JsonEditor,
      SchemaTable,
      SchemaForm,
      AjvErrors
    }
  }
</script>
