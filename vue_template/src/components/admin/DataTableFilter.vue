<template>

    <v-toolbar >

    <FilterAutocomplete
    url='http://127.0.0.1:8000/api-base/organization/'
     v-bind:initial="organization"
     >
    </FilterAutocomplete>
    

     </v-toolbar>

</template>
<script>
import FilterAutocomplete from '@/components/base/FilterAutocomplete';
export default {
  components: {
    FilterAutocomplete
  },
    data() {
      return {
      organization:null
    }
  },}
</script>
