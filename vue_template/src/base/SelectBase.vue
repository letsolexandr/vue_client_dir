<template>
<v-select :label="label" :items="items" v-model="selected">
</v-select>
</template>
<script>
import axios from 'axios';
export default {
  props: ['value', 'url', 'label'],
  model: {
    prop: 'value',
    event: 'update'
},
  data() {
    return {
      selected:null,
      items: [],
    }
  },

  watch: {
    value(val) {
      this.selected = val;
    },
    selected(val) {
      this.$emit('update', val)
    }
  },
  mounted() {
    const self = this;
    axios.get(self.url, )
      .then((response) => {
        self.items = response.data;

      })
      .catch(error => {
        let error_data = error.response.data;

      });
      this.selected = this.value;

  },
}
</script>
