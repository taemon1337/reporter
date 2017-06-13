<template>
  <div>
    <multi-select :name='name' :items='items' :value='value'></multi-select>
  </div>
</template>

<script>
  import MultiSelect from 'sf/components/MultiSelect'
  import { SchemeTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'SchemaSelect',
    props: {
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        selected: []
      }
    },
    computed: {
      ...mapGetters({
        items: SchemeTypes.findAll
      })
    },
    components: {
      MultiSelect
    }
  }
</script>
