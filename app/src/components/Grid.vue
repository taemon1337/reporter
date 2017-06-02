<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md3 lg2>
      <v-card horizontal v-for='(card, index) in cards' key='index'>
        <v-card-column>
          <v-card-row height="75px" :class="topClass">
            <v-card-text>
              <v-card-title m0>
                <slot name='title' :card='card'></slot>
              </v-card-title>
              <div class='title'>
                <slot name='subtitle' :card='card'></slot>
              </div>
            </v-card-text>
          </v-card-row>
          <v-card-row>
            <slot name='actions'></slot>
          </v-card-row>
          <v-card-row v-if="card.actions" actions :class="bottomClass">
            <div v-for='(action, idx) in card.actions' key='idx'>
              <slot name='action' :action='action'></slot>
            </div>
          </v-card-row>
          <v-card-row v-if="actions" actions :class="bottomClass">
            <div v-for='(action, idx) in actions' key='idx'>
              <slot name='action' :action='action'></slot>
            </div>
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
      map: {},
      actions: {},
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
    },
    methods: {
      mapField (record, field) {
        try {
          if (this.map) {
            return record[this.map[field]]
          } else {
            return record[field]
          }
        } catch (err) {
          console.warn('Error mapping field', err, record, field)
          if (record) { return record[field] }
        }
      }
    }
  }
</script>
