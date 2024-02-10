<script setup>
import ymaps from 'ymaps'
import {onMounted} from "vue";
const initMap = () => {
  ymaps
      .load(`https://api-maps.yandex.ru/2.1/?apikey=122d180f-61ee-4bcc-bb14-2832b1a6107b&lang=en_US`)
      .then(maps => {
        let map = new maps.Map('map', {
          center: [46.190629, 36.822734],
          zoom: 6
        })
        map.controls.remove('zoomControl')
        map.controls.remove('geolocationControl')
        map.controls.remove('rulerControl')
        map.controls.remove('trafficControl')
        map.controls.remove('typeSelector')
        map.controls.remove('searchControl')

        let placemark = new maps.Placemark( [46.190629, 36.822734], {}, {

        })
      })
      .catch(error => {
        console.error('Failed to load Yandex Maps:', error);
      });
}
onMounted(() => {
  initMap();
})
</script>

<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>


<style scoped>
#map {
  width: 100dvw ;
  height: 400px; /* Adjust the height as needed */
}
</style>
