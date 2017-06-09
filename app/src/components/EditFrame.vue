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
      <slot name='toolbar-buttons'></slot>
      <v-btn v-if='saving' :light='light' :dark='dark' disabled>
        <span class='fa fa-spinner fa-spin'></span> Saving...
      </v-btn>
      <v-btn v-else-if='hasChanges' class='green darken-1 white--text' @click.native='debounceSave'>
        <v-icon class='white--text mr-1'>save</v-icon> Save
      </v-btn>
      <v-btn v-else-if='record._id' class='green darken-2 white--text' disabled>
        <v-icon class='green--text mr-1'>check</v-icon> Saved
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
    <v-footer :class='color' :light='light' :dark='dark' style='height:100px;'>
      <div class='white pr-3 pl-3 pt-1 pb-1'>
        <div v-if='hasChanges' class='red--text'>
          <v-icon class='red--text'>info</v-icon> Not saved!
        </div>
        <div v-else-if='record._id' class='green--text'>
          <v-icon class='green--text'>check_circle</v-icon>Saved <timeago :since='updatedAt'></timeago> at {{ record._updated }}
        </div>
        <ajv-errors :valid='validFormData' message='The form data is valid' :errors='formValidator.errors'></ajv-errors>
        <slot name='footer'></slot>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
  import AjvErrors from '@/components/AjvErrors'
  import debounce from 'debounce'
  import Ajv from 'ajv'

  export default {
    name: 'EditFrame',
    props: {
      title: {
        type: String
      },
      schema: {
        type: Object
      },
      record: {
        type: Object,
        required: true
      },
      cache: {
        type: Object,
        required: true
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
        formValidator: new Ajv({ allErrors: true }),
        saving: false,
        drawer: false
      }
    },
    computed: {
      validFormData () {
        if (this.schema) {
          return this.formValidator.validate(this.schema, this.cache)
        } else {
          return false
        }
      },
      hasChanges () {
        return JSON.stringify(this.cache) !== JSON.stringify(this.record)
      },
      updatedAt () {
        return new Date(this.record._updated)
      }
    },
    methods: {
      debounceSave: debounce(function () {
        let self = this
        this.saving = true
        this.$emit('save')
        setTimeout(function () {
          if (self.saving) {
            self.saving = false
          }
        }, 5000)
      }, 500),
      emitRemove () {
        let a = confirm('Are you sure you want to remove ' + this.title + '?')
        if (a) {
          this.$emit('remove')
        }
      }
    },
    watch: {
      cache () {
        if (!this.hasChanges) {
          this.saving = false
        }
      }
    },
    components: {
      AjvErrors
    }
  }
</script>
