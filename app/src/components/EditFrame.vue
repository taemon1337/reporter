<template>
  <v-app>
    <v-navigation-drawer v-model='drawer' clipped light right temporary class="grey lighten-4">
      <slot name='drawer'></slot>
    </v-navigation-drawer>
    <v-toolbar :class="color">
      <v-btn icon  :light='light' :dark='dark' @click.native='$router.back' v-tooltip='{ "html": "Go back" }'>
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
      <v-toolbar-title :class="color">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :light='light' :dark='dark'>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn icon :light='light' :dark='dark'>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-menu>
        <v-btn icon="icon" slot="activator" :light='light' :dark='dark'>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item v-if='$route.params.id !== "new"'>
            <v-list-tile>
              <v-list-tile-title @click='emitRemove'>Delete</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-title @click='drawer=true'>Help</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <main>
      <slot name='content'></slot>
    </main>
    <!--<v-footer></v-footer>-->
  </v-app>
</template>

<script>
  export default {
    name: 'EditFrame',
    props: {
      record: {
        type: Object,
        required: true
      },
      title: {
        type: String
      },
      light: {
        type: Boolean,
        default: false
      },
      dark: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default () { return '' }
      }
    },
    data () {
      return {
        drawer: false
      }
    },
    methods: {
      emitRemove () {
        let a = confirm('Are you sure you want to remove ' + this.title + '?')
        if (a) {
          this.$emit('remove', this.record)
        }
      }
    }
  }
</script>
