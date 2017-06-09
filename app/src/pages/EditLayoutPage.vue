<template>
  <div>
    <v-dialog v-model="previewing">
      <v-card v-if='previewing && layout' style='width:600px;'>
        <v-card-row>
          <v-card-title>{{ layout.name }} Preview</v-card-title>
        </v-card-row>
        <v-card-row>
          <layout-render :layout='layout.template'></layout-render>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="previewing = false">Close</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
    
    <edit-frame :title='computedTitle' :schema='computedLayoutSchema' :record='layout' :cache='cache' :color='layoutColor.primary' @remove='removeRecord'  @save='save' dark>
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
      <div slot='toolbar-buttons'>
        <v-btn icon title='Preview Layout' @click.native='previewing = true'>
          <v-icon>present_to_all</v-icon>
        </v-btn>
      </div>
      <div slot='content'>
        <div v-if='layoutSchema'>
          <schema-form :schema='computedLayoutSchema' v-model='cache' :color='layoutColor.primary' @input='saveRecord'></schema-form>
        </div>
      </div>
    </edit-frame>
  </div>
</template>

<script>
  import EditFrame from '@/components/EditFrame'
  import SchemaForm from 'sf/SchemaForm'
  import LayoutRender from '@/components/LayoutRender'
  import { mapGetters } from 'vuex'
  import { LayoutTypes, SchemeTypes, GlobalTypes } from '@/store/mutation-types'
  import { capitalize } from '@/lib/capitalize'

  export default {
    name: 'EditLayoutPage',
    data () {
      return {
        previewing: false,
        cache: {},
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
        layoutSchema: SchemeTypes.layoutSchema,
        layout: LayoutTypes.active,
        layoutColor: GlobalTypes.layoutColor
      }),
      computedTitle () {
        return 'Edit ' + capitalize(this.layout.name)
      },
      computedLayoutSchema () {
        if (this.layoutSchema) {
          return this.layoutSchema.jsonschema
        } else {
          return {}
        }
      }
    },
    methods: {
      save () {
        let self = this
        process.nextTick(function () {
          self.$store.dispatch(LayoutTypes.save, self.cache)
        })
      },
      saveRecord (record) {
        this.cache = record
      },
      removeRecord (record) {
        this.$store.dispatch(LayoutTypes.remove, this.layout)
        this.$router.back()
      }
    },
    mounted () {
      this.cache = Object.assign({}, this.layout)
      this.$store.dispatch(SchemeTypes.findAll)
      // this.$store.dispatch(LayoutTypes.findAll)
      this.$store.dispatch(LayoutTypes.find, this.$route.params.id)
    },
    watch: {
      layout () {
        this.cache = Object.assign({}, this.layout)
      }
    },
    components: {
      EditFrame,
      SchemaForm,
      LayoutRender
    }
  }
</script>
