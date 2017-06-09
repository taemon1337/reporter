<template>
  <v-card :class="color">
    <v-card-text>
      <v-container fluid v-for="(obj, key) in schema" key='key' style='padding:5px 50px;'>
        <schema-tree :name='key' :obj='obj' :value='cache' @input='emitInput'></schema-tree>
      </v-container>
    </v-card-text>
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
      emitInput () {
        this.$emit('input', this.cache)
      }
    },
    watch: {
      value () {
        this.cache = Object.assign({}, this.value)
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
