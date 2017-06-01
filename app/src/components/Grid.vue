<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md3 lg2>
      <v-card horizontal v-for='(card, index) in cards' key='index'>
        <v-card-column>
          <v-card-row height="75px" :class="topClass">
            <v-card-text>
              <v-card-title m0>{{ card.title }}</v-card-title>
              <strong>{{ card.title }}</strong>
              <div>{{ card.subtitle }}</div>
            </v-card-text>
          </v-card-row>
          <v-card-row v-if="card.actions" actions :class="bottomClass">
            <v-btn @click.native="card.click ? typeof card.click === 'function' ? card.click() : $router.push(card.click) : null" v-for="(action, idx) in card.actions" key='idx' flat class="white--text">
              <v-icon left light>{{ action.icon }}</v-icon>
              {{ action.title }}
            </v-btn>
          </v-card-row>
        </v-card-column>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Grid',
    props: {
      cards: {
        default () { return [] }
      },
      color: {
        default () { return 'indigo' }
      }
    },
    data () {
      return {}
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
