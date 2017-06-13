<template>
   <v-card>
    <v-card-row :class="schemaColor.primary">
      <v-card-title>
        <span class="white--text">{{ title }}</span>
        <v-spacer></v-spacer>
        <div>
          <v-btn :class='schemaColor.light' @click.native='addChild'>
            <v-icon>add</v-icon>
            Add Child Schema
          </v-btn>
          <v-menu bottom left origin="top right">
            <v-btn icon="icon" slot="activator" class="white--text">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>Help</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
    </v-card-row>
    <v-card-text>
      <v-card-row>
        <v-layout>
          <v-flex xs6 style='min-width:150px;'>
            <span>
              <schema-select label='Select schema' name='field' :value='newchild.ref' @input='setChildSchema'></schema-select>
              <v-text-field v-if='newchild.ref' :value='newchild.field' placeholder='map schema to field...' @input='setChildField'></v-text-field>
              <v-btn :disabled='!(newchild.ref && newchild.field)' :class='schemaColor.light' @click.native='addChild'>
                <v-icon>add</v-icon>
                Add
              </v-btn>
            </span>
          </v-flex>
          <v-flex xs6>
            <span v-for='(val, key) in cache' key='key'>
              <v-chip>{{ key }} => {{ val }}</v-chip>
            </span>
          </v-flex>
        </v-layout>
      </v-card-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { SchemeTypes, GlobalTypes } from '@/store/mutation-types'
  import SchemaSelect from 'sf/components/SchemaSelect'

  export default {
    name: 'DefinitionsForm',
    props: {
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: 'Mount child schema into this schema'
      }
    },
    data () {
      return {
        newchild: {
          ref: ''
        },
        cache: {}
      }
    },
    computed: {
      ...mapGetters({
        schemaColor: GlobalTypes.schemaColor
      })
    },
    methods: {
      addChild () {
        let child = {}
        child[this.newchild.field] = this.newchild.ref
        this.cache = Object.assign({}, this.cache, child)
        this.newchild = { ref: '' }
      },
      setChildField (val) {
        this.newchild = Object.assign({}, this.newchild, { field: val })
      },
      setChildSchema (val) {
        this.newchild = Object.assign({}, this.newchild, { ref: val.name })
      }
    },
    mounted () {
      this.$store.dispatch(SchemeTypes.findAll)
    },
    components: {
      SchemaSelect
    }
  }
</script>
