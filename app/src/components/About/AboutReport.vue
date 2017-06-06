<template>
  <v-card :class="color">
    <v-card-title>
      <v-chip class="primary white--text">3</v-chip>
      create Report
    </v-card-title>
    <v-card-text>
      <div>
        To create a report, follow these easy steps:
        <br><br>
        <v-chip class='green darken-4 white--text'>1</v-chip>
        Select Schema
        <br>
        <v-chip class='green darken-4 white--text'>2</v-chip>
        Select and Customize Layout
        <br>
        <v-chip class='green darken-4 white--text'>3</v-chip>
        Fill out data fields
        <br>
        <v-chip class='green darken-4 white--text'>4</v-chip>
        Generate PDF
        <br>
        <br>
        *HINT: After finalizing a layout, make sure to then save it
        as a standard layout for reuse.
        <br>
        **HINT: Also be sure to use proper versioning to differentiate betweeen subtle differences in layouts.
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'AboutReport',
    props: ['color'],
    data () {
      return {}
    }
  }
</script>
