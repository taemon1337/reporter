<template>
  <div>
    <iframe :src='url' style='width:100%;height:900px;'></iframe>
  </div>
</template>

<script>
  export default {
    name: 'TemplatePage',
    data () {
      return {
        url: '/templates'
      }
    }
  }
</script>
