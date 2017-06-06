<template>
  <edit-frame :title='computedTitle' :record='layout' :color='layoutColor.primary' @remove='removeRecord'  @save='saveRecord' dark>
    <v-card slot='drawer' class='yellow lighten-3'>
      <v-card-title>What is a layout?</v-card-title>
      <v-card-text>
        A layout is...
        <br><br>
        A template or partial view of a particular type of schema(s), it is defined as html with data fields embed using the handlebars templating language.
        <br><br>
        <v-card>
          <v-card-title>Example Layout</v-card-title>
          <v-card-text>
            <code>{{ test.layout }}</code>
          </v-card-text>
        </v-card>
        <br>
        <v-card>
          <v-card-title>Example Schema Data</v-card-title>
          <v-card-text>
            <pre>{{ test.data }}</pre>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <div slot='content'>
      <div v-if='layout_schema'>
        <schema-form :schema='jsonschema' :value='layout' :color='layoutColor.primary' @save='saveRecord'></schema-form>
      </div>
    </div>
  </edit-frame>
</template>

<script>
  import EditFrame from '@/components/EditFrame'
  import SchemaForm from 'sf/SchemaForm'
  import { mapGetters } from 'vuex'
  import { LayoutTypes, SchemeTypes, GlobalTypes } from '@/store/mutation-types'
  import { capitalize } from '@/lib/capitalize'

  export default {
    name: 'EditLayoutPage',
    data () {
      return {
        test: {
          layout: '<v-card>\n <v-card-title>\n  {{ data.name }}\n  </v-card-title>\n <v-card-text>\n  <dl>\n   <dt>Name:</dt>\n   <dd>{{ data.name }}</dd>\n   <dt>Email:</dt>\n   <dd>{{ data.email }}</dd>\n   <dt>Phone:</dt>\n   <dd>{{ data.phone }}</dd>\n  </dl>\n </v-card-text>\n</v-card>',
          data: {
            name: 'John Smith',
            email: 'john.smith@gmail.com',
            phone: '555-867-5309',
            age: 30
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        layout: LayoutTypes.active,
        layout_schema: SchemeTypes.layout,
        layoutColor: GlobalTypes.layoutColor
      }),
      jsonschema () {
        if (this.layout_schema) {
          return this.layout_schema.jsonschema
        }
      },
      computedTitle () {
        return 'Edit ' + capitalize(this.layout.name)
      }
    },
    methods: {
      saveRecord (record) {
        this.$store.dispatch(LayoutTypes.save, Object.assign({}, this.layout, record))
      },
      removeRecord (record) {
        this.$store.dispatch(LayoutTypes.remove, this.layout)
      }
    },
    mounted () {
      this.$store.dispatch(SchemeTypes.findAll)
      this.$store.dispatch(LayoutTypes.find, this.$route.params.id)
    },
    components: {
      EditFrame,
      SchemaForm
    }
  }
</script>
