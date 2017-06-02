<template>
  <div>
    <h3 v-badge="{ value: schemes.length, left: true }">
      Schemas
    </h3>
    <grid :cards='[newCard]'>
      <template slot='title' scope='props'>{{ props.card.title }}</template>
      <template slot='subtitle' scope='props'>{{ props.card.subtitle }}</template>
    </grid>
    <grid :cards='schemes' :map='mapToCard' :actions='cardActions'>
      <template slot='title' scope='props'>{{ props.card.name }}</template>
      <template slot='subtitle' scope='props'>{{ props.card.description }}</template>
      <template slot='action' scope='props'>
        <v-btn @click.native='$router.push(props.action.route)' flat class='white--text'>
          <v-icon left light>{{ props.action.icon }}</v-icon>
          {{ props.action.title }}
        </v-btn>
      </template>
    </grid>
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
          subtitle: 'Do it',
          click: '/schemes/new',
          actions: [{ title: 'Create scheme now', icon: 'add' }]
        },
        mapToCard: {
          title: 'name',
          subtitle: 'description'
        },
        cardActions: [
          {
            title: 'Open',
            click: function (router, scheme) {
              router.push('/schemes/' + scheme._id)
            }
          }
        ]
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
      Grid
    }
  }
</script>
