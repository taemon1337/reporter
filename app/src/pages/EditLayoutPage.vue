<template>
  <v-layout>
    <v-flex xs12>
      <h3>Editing {{ layout.name }} Layout</h3>
      <div v-if='layout_schema'>
        <schema-form :schema='jsonschema' :value='layout' @save='saveRecord'></schema-form>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import SchemaForm from '@/components/SchemaForm'
  import { mapGetters } from 'vuex'
  import { LayoutTypes, SchemeTypes } from '@/store/mutation-types'

  export default {
    name: 'EditLayoutPage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        layout: LayoutTypes.active,
        layout_schema: SchemeTypes.layout
      }),
      jsonschema () {
        if (this.layout_schema) {
          return this.layout_schema.jsonschema
        }
      }
    },
    methods: {
      saveRecord () {
        this.$store.dispatch(LayoutTypes.save, Object.assign({}, this.layout))
      }
    },
    mounted () {
      this.$store.dispatch(SchemeTypes.findAll)
      this.$store.dispatch(LayoutTypes.find, this.$route.params.id)
    },
    components: {
      SchemaForm
    }
  }
</script>
