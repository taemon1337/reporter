<template>
  <md-card>
    <md-card-media v-if="user.profile && user.profile.avatar">
      <img :src="user.profile.avatar" width="100%">
    </md-card-media>
    
    <md-card-header>
      <div class="md-title">{{ user.name }}</div>
      <div v-if="user.profile && user.profile.status" class="md-subhead">{{ user.profile.status }}</div>
    </md-card-header>
    
    <md-card-actions>
      <md-button href="#">Profile</md-button>
      <md-button href="#">Settings</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
  export default {
    name: 'ProfileCard',
    props: ['user'],
    data () {
      return {}
    }
  }
</script>

<style>
  .md-avatar {
    margin-right: 0px;
  }
  .user-card-info {
    display: flex;
    flex-flow: column;
    flex: 1;
  }
  .user-card-links {
    display: flex;
    a + a {
      margin-left: 8px;
    }
  }
</style>
