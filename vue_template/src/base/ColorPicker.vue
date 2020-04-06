<template>
  <div>
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="item_color"
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="thisColorHex"
                label="Виберіть колір"
                :error-messages="errormessages"
                slot="prepend"
                 readonly
                v-on="on"
              >
              <v-icon slot="append"
                      :color="thisColor"
                      size="x-large"
                      >mdi-square
              </v-icon>
               <v-icon slot="prepend"
                      size="x-large"
                      >mdi-format-color-fill
              </v-icon>
              </v-text-field>
            </template>
        <chrome-picker  v-model='color'></chrome-picker>
          </v-menu>
</div>
</template>

<script>
import { Chrome } from 'vue-color';
export default {
  props: ['value','errormessages'],
  data() {
    return {
      menu: false,
      item_color:null,
      color:{
  hex: '#194d33',
  hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
  hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  a: 1
}
        }
  },
  watch: {
  // эта функция запускается при любом изменении вопроса
  color: function (color, oldColor) {
    if (color == this.value){
      return;
    }
    else{
    this.$emit('input', this.thisColorHex);
    }
  },
  value: function (val, oldval) {
    if (val == this.color.hex){
      return;
    }
    if (typeof val !== 'undefined'){
    this.color.hex = val;

    }
    //this.$emit('input', this.getColor());

  },
},
  components: {
    'chrome-picker': Chrome,
  },
  computed:{
    thisColor() {
      return this.getColor();
    },
    thisColorHex() {
      //debugger;
      return this.color.hex;
    }
  },
  methods:{
  getColor(){
    if (this.color){
      //debugger;
  let rgb = this.color.rgba;
  let result = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
  return result;}
  else { return 'rgba(255,0,0,1)';}
}
}

}
</script>
