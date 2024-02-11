<script setup>
import ymaps from 'ymaps'
import {onMounted} from "vue";
import axios from 'axios'

const getMarkers = async () => {
  try {
    const response = await axios.get("/api/markers");

    // Process the response data
    return response.data
  } catch (error) {
    // Handle the error
    console.error("Error fetching data:", error.message);
  }
}
const initMap = async () => {
  await ymaps
      .load(`https://api-maps.yandex.ru/2.1/?apikey=122d180f-61ee-4bcc-bb14-2832b1a6107b&lang=en_US`)
      .then(maps => {
        let map = new maps.Map('map', {
          center: [47.1078, 39.4165],
          zoom: 10
        })
        map.controls.remove('zoomControl')
        map.controls.remove('geolocationControl')
        map.controls.remove('rulerControl')
        map.controls.remove('trafficControl')
        map.controls.remove('typeSelector')
        map.controls.remove('searchControl')
        map.controls.remove('fullscreenControl')
        getMarkers().then(res => {
          res.forEach((marker) => {
            if (marker.isValidate) {
              const markerDate = new Date(marker.dateCreated)
              let placemark = new maps.Placemark([marker.latitude, marker.longitude], {
                balloonContent: `
  <div class="balloon">
    <figure>
      <img src="data:image/png;base64,${marker.image}" alt="${marker.description}">
    </figure>
    <div class="balloon-header">
      <h3 id="description_style">${marker.description} </h3>
    </div>
    <div class="balloon-content">
      <p v-if="${marker.status}">Статус: ${marker.status.name}</p>
      <p>Ремонтируется: ${marker.isRepair ? "Да" : "Нет"}</p>
      <p v-if="${marker.userCreatedId}">Выложено пользователем ${marker.userCreatedId}</p>
      <p v-if="${marker.userCreatedId}">Метка создана: ${markerDate.getDate()}.${markerDate.getMonth() + 1}.${markerDate.getFullYear()}</p>

    </div>
  </div>
          `
              }, {
                iconLayout: 'default#image',
                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6387/6387773.png',
                iconImageSize: [40, 40]
              });
              map.geoObjects.add(placemark)
            }
          })
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
</style>
