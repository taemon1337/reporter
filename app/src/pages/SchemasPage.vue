<template>
  <div>
    <v-layout row wrap>
      <card class='mt-3' :card='newCard' :actions='newActions' :color='schemaColor.dark'>
        <template slot='title' scope='props'>{{ props.card.title }}</template>
      </card>
      <card class='mt-3' v-for="(card, index) in schemes" :color='schemaColor.light' :card='card' :title='card.name' :subtitle='card.description' :actions='actions' :key='card._id'></card>
    </v-layout>
  </div>
</template>

<script>
  import Card from '@/components/Card'
  import { SchemeTypes, GlobalTypes } from '@/store/mutation-types'
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
        schemes: SchemeTypes.findAll,
        schemaColor: GlobalTypes.schemaColor
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
