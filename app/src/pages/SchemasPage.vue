<template>
  <div>
    <h3 v-badge="{ value: schemes.length, left: true }">
      Schemas
    </h3>
    <v-layout row wrap>
      <card :card='newCard' :actions='newActions' color='green'>
        <template slot='title' scope='props'>{{ props.card.title }}</template>
      </card>
      <card v-for="(card, index) in schemes" :card='card' :title='card.name' :subtitle='card.description' :actions='actions' :key='card._id'></card>
    </v-layout>
  </div>
</template>

<script>
  import Card from '@/components/Card'
  import { SchemeTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'SchemasPage',
    data () {
      return {
        newCard: {
          title: 'Add Scheme...',
          subtitle: 'Do it'
        },
        newActions: [{ title: 'Create scheme now', icon: 'add', route: '/schemes/new' }],
        actions: [{ title: 'View or Edit', icon: 'edit', route: function (card) { return '/schemes/' + card._id } }]
      }
    },
    computed: {
      ...mapGetters({
        schemes: SchemeTypes.findAll
      })
    },
    created () {
      this.$store.dispatch(SchemeTypes.findAll)
    },
    components: {
      Card
    }
  }
</script>
