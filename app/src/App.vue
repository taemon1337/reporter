<template>
  <v-app>
    <v-toolbar fixed class="indigo darken-4" light>
      <router-link to='/home'>
        <v-btn icon light>
          <v-icon>home</v-icon>
        </v-btn>
      </router-link>
      <v-toolbar-title>Reporter</v-toolbar-title>
      <v-toolbar-items>
        <v-toolbar-item>
          <router-link tag='span' to="/schemes">Schemas</router-link>
        </v-toolbar-item>
        <v-toolbar-item>
          <router-link tag='span' to="/layouts">Layouts</router-link>
        </v-toolbar-item>
        <v-toolbar-item>
          <router-link tag='span' to="/reports">Reports</router-link>
        </v-toolbar-item>
        <v-toolbar-item>
          <router-link tag='span' to="/about">About</router-link>
        </v-toolbar-item>
      </v-toolbar-items>      
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import 'vuetify/dist/vuetify.min.css'
  import 'vuetify/dist/vuetify.js'

  export default {
    name: 'app',
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: false,
        right: null
      }
    }
  }
</script>
