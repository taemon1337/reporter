<template>
  <div>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.css'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar
  }
}
</script>
