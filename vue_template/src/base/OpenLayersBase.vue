
<template>
<v-container fluid>
  <div :id="container_id" class="map"></div>
</v-container>
</template>
<script>
import config from '@/config';
import 'ol/ol.css';
import { Map, View} from 'ol';
import {  fromLonLat} from 'ol/proj.js'
import TileLayer from 'ol/layer/Tile';
import Geolocation from 'ol/Geolocation';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import GeoJSON from 'ol/format/GeoJSON.js';

export default {
  props: ['label','value','container_id','errormessages',
  'filter','layers','bbox','redraw'],
  data() {
    return {
      map: {
        type: Object,
        default: {}
      },
      config:config,
      query:'',
      extent:null,

    }
  },

watch:{
  filter(id){
    //debugger;
    this.check_filter()
    this.overlay_layer.getSource().getParams().FILTER=this.query;
    this.overlay_layer.getSource().updateParams({"time": Date.now()});
    if(this.$props.value){
    var geom = (new GeoJSON()).readFeatures(this.$props.value);
    this.extent = geom[0].getGeometry().getExtent();
    this.map.getView().fit(this.extent);
    setTimeout(()=>{
      this.map.updateSize();
    },200)
    }
  },
  bbox(){
    if(this.bbox){
      var geom = (new GeoJSON()).readFeatures(this.bbox);
      this.extent = geom[0].getGeometry().getExtent();
      this.map.getView().fit(this.extent);
    }
    this.map.updateSize();
  },
  redraw(){
    //debugger
    this.map.updateSize();
    this.map.getView().fit(this.extent);
  }
},
updated() {
  //debugger;
    this.map.updateSize();
    this.map.getView().fit(this.extent);
},
activated() {
  //debugger;
  this.map.updateSize();
  if (this.extent){
    this.map.getView().fit(this.extent);
  }

},
  mounted() {
    //debugger
    this.check_filter()
    this.overlay_layer = new TileLayer({
      //extent: [-13884991, 2870341, -7455066, 6338219],
      source: new TileWMS({
        url: `${this.config.map_domen}/wms`,
        params: {'LAYERS': this.layers,//'field',
                 'TILED': true,
                 'FILTER':this.query},
        serverType: 'geoserver',
        transition: 0
      })
    });
    this.map = new Map({
      target: this.container_id,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
  this.overlay_layer
      ],
      view: new View({
        center: fromLonLat([37.41, 50.0]),
        zoom: 8
      })
    });
    this.map.updateSize();

  },
  methods:{
    check_filter: function(){
      if(this.filter){
        this.query=this.filter
      }
      else{
        this.query=`id=${this.id}`
      }
    //debugger
    },
  }
}
</script>

<style>
.map {
  margin: 0;
  height: 355px;
  width: 100%;

}
</style>
