<template>
  <v-card :class="color">
    <v-card-text>
      <v-container fluid v-for="(obj, key) in schema" key='key' style='padding:5px 50px;'>
        <schema-tree :name='key' :obj='obj' :value='cache'></schema-tree>
      </v-container>
    </v-card-text>
    <v-card-row actions>
      <v-btn flat class="green--text darken-1" @click.native='save'>Save Record</v-btn>
    </v-card-row>
  </v-card>
</template>

<script>
  import SchemaTree from 'sf/SchemaTree'

  export default {
    name: 'RecordForm',
    props: ['schema', 'value', 'color'],
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
