<template>
  <v-flex xs12 sm6 md3 lg2>
    <v-card>
      <v-card-column>
        <v-card-row height="75px" :class="topClass">
          <v-card-text>
            <v-card-title m0>
              {{ title || card.title }}
            </v-card-title>
            {{ subtitle || card.subtitle || '' }}
          </v-card-text>
        </v-card-row>
        <v-card-row v-if="actions" actions :class="bottomClass">
          <div v-for='(action, idx) in actions' key='idx'>
            <v-btn v-if='action.click' @click.native='action.click()'>
              <v-icon>{{ action.icon }}</v-icon>
              {{ action.title }}
            </v-btn>
            <v-btn v-if='action.route' @click.native='$router.push(getRoute(action))'>
              <v-icon>{{ action.icon }}</v-icon>
              {{ action.title }}
            </v-btn>
          </div>
        </v-card-row>
      </v-card-column>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      card: {
        required: true,
        default () { return {} }
      },
      title: {},
      subtitle: {},
      actions: {},
      color: {
        default () { return 'indigo' }
      }
    },
    data () {
      return {}
    },
    methods: {
      getRoute (action) {
        return typeof action.route === 'function' ? action.route(this.card) : action.route
      }
    },
    computed: {
      topClass () {
        return this.color + ' white--text'
      },
      bottomClass () {
        return this.color + ' darken-2'
      }
    }
  }
</script>
