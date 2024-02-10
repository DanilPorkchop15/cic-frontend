<script setup lang="ts">
import {  RouterView } from 'vue-router'
import MyHeader from "@/components/ui/MyHeader/MyHeader.vue";
</script>

<template>
  <main>
    <MyHeader/>
    <router-view/>
  </main>
</template>

<style scoped>
</style>
