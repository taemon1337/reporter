<template>
  <div style='padding:50px;'>
    <v-layout row>
      <v-flex xs6><pre>{{ value }}</pre></v-flex>
      <v-flex xs6><pre>{{ cache }}</pre></v-flex>
    </v-layout>
    <v-card class="grey lighten-4 elevation-0">
      <v-card-text>
        <v-container fluid n v-for="(obj, key) in schema" key='key'>
          <schema-tree :name='key' :obj='obj' :value='cache'></schema-tree>
        </v-container>
      </v-card-text>
      <v-card-row actions>
        <v-btn flat class="green--text darken-1" @click.native='save'>Save Record</v-btn>
      </v-card-row>
    </v-card>
  </div>
</template>

<script>
  import SchemaTree from '@/components/SchemaTree'

  export default {
    name: 'RecordForm',
    props: ['schema', 'value'],
    data () {
      return {
        cache: {}
      }
    },
    methods: {
      save () {
        this.$emit('save', this.cache)
      }
    },
    mounted () {
      this.cache = Object.assign({}, this.value)
    },
    components: {
      SchemaTree
    }
  }
</script>
