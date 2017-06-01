<template>
  <div>
    <h3 v-badge="{ value: schemes.length, left: true }">
      Schemas
    </h3>
    <grid :cards='[newCard]'></grid>
    <grid :cards='schemes' :map='mapToCard'></grid>
  </div>
</template>

<script>
  import Grid from '@/components/Grid'
  import { SchemeTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'SchemasPage',
    data () {
      return {
        newCard: {
          title: 'Add new scheme',
          click: '/schemes/new',
          actions: [{ title: 'Create scheme now', icon: 'add' }]
        },
        mapToCard: {
          title: 'name'
        }
      }
    },
    computed: {
      ...mapGetters({
        schemes: SchemeTypes.findAll
      })
    },
    components: {
      Grid
    }
  }
</script>
