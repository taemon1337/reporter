<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class='mb-3'>
        <v-card-title>What does this app do?</v-card-title>
        <v-card-text>
          <div>This application allows automated report definition and creation, as well as export to PDF.</div>
        </v-card-text>
      </v-card>
  
      <v-layout row>
        <v-flex xs12 md4>
          <about-schema :color='schemaColor.primary'></about-schema>
        </v-flex>
        <v-flex xs12 md4>
          <about-layout :color='layoutColor.primary'></about-layout>
        </v-flex>
        <v-flex xs12 md4>
          <about-report :color='reportColor.primary'></about-report>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import AboutSchema from '@/components/About/AboutSchema'
  import AboutLayout from '@/components/About/AboutLayout'
  import AboutReport from '@/components/About/AboutReport'
  import { GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'AboutPage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        schemaColor: GlobalTypes.schemaColor,
        layoutColor: GlobalTypes.layoutColor,
        reportColor: GlobalTypes.reportColor
      })
    },
    components: {
      AboutSchema,
      AboutLayout,
      AboutReport
    }
  }
</script>
