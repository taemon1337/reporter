<template>
  <div style='padding:25px;'>
    <h1>DFS Report Home Page</h1>
    
    <md-card class='col-xs-3' v-for="(card, index) in cards" key="index">
      <md-card-header>
        <div class='md-title'>{{ card.title }}</div>
        <div class='md-subhead'>{{ card.subtitle }}</div>
      </md-card-header>
      
      <md-card-media v-if="card.image">
        <img :src="card.image">
      </md-card-media>
      
      <md-card-actions>
        <md-button class='md-raised md-primary' v-for="(action, idx) in card.actions" key="idx" @click.native="$router.push(action.route)">
          {{ action.text }}
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      cards: [
        {
          title: 'Template Editor',
          subtitle: 'Define a template to use to generate reports',
          image: './assets/template-photo.png',
          actions: [
            {
              text: 'Open Editor',
              route: '/editor'
            }
          ]
        }
      ]
    }
  }
}
</script>
