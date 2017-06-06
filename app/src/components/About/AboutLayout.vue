<template>
  <v-card :class="color">
    <v-card-title>
      <v-chip class="primary white--text">2</v-chip>
      build Layout
    </v-card-title>
    <v-card-text>
      <div>
        To build a layout, start by creating small partial layouts, like one just for Contact Information.
        <br><br>
        Combine many partial layouts into a full layout and save for reuse.
        <br><br>
        *HINT: Never duplicate layouts, just create a partial and use it twice!
      </div>
      <v-card class='lime darken-3 dark--text mt-3'>
        <v-card-title>Contact Info Partial</v-card-title>
        <v-card-text>
          <v-chip small>{ person.name }</v-chip> is
          <v-chip small>{ person.age }</v-chip> years old and can be reached
          at <v-chip small>{ person.phone }</v-chip> or email at
          <v-chip small>{ person.email }</v-chip>, thanks!
        </v-card-text>
      </v-card>
      <br>
      Notice that we embed data fields from the JSON schema into a partial layout.
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'AboutLayout',
    props: ['color'],
    data () {
      return {}
    }
  }
</script>
