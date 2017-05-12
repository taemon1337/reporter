<template>
  <md-toolbar>
    <div class="md-toolbar-container">
      <md-button class="md-icon-button" v-on:click.native="toggleSidebar">
        <md-icon>menu</md-icon>
      </md-button>
      <md-button class='md-icon-button' @click.native='$router.push("/")'>
        <md-tooltip>Go Home</md-tooltip>
        <md-icon>home</md-icon>
      </md-button>
  
      <h2 class="md-title" style="flex: 1;">
        <md-button @click.native="$router.push('/')">Digital Forensic Services</md-button>
      </h2>
      
      <md-input-container v-show="showingsearch" style="width:150px;">
        <label>Search</label>
        <md-input @focusout.native="showingsearch = false" autofocus></md-input>
      </md-input-container>
  
      <md-button v-show="!showingsearch" @click.native="showingsearch = true" class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>
      
      <md-menu md-size="4" md-direction="bottom left" ref="profile-card-menu">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>person</md-icon>
        </md-button>
        
        <md-menu-content>
          <profile-card :user="$store.state.currentUser"></profile-card>
        </md-menu-content>
      </md-menu>
    </div>
  </md-toolbar>
</template>
<script>
  import { GlobalTypes } from '@/store/mutation-types'
  import ProfileCard from '@/components/ProfileCard'

  export default {
    name: 'Navbar',
    data () {
      return {
        showingsearch: false
      }
    },
    methods: {
      toggleSidebar () {
        this.$store.dispatch(GlobalTypes.TOGGLE_SIDEBAR)
      },
      test () {
        this.$router.push({ path: '/editor' })
      }
    },
    components: {
      ProfileCard
    }
  }
</script>
