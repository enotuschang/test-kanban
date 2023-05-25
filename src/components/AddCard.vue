<script setup lang="ts">
import Form from './Form.vue'
</script>

<template>
  <div class="w-[380px] max-w-full">
    <h1 class="text-3xl text-slate-700 text-center font-bold">Добавление карточки</h1>
    <div class="p-8 mt-2 bg-white text-slate-700 rounded">
      <h2 class="text-xl font-bold">Основные данные</h2>
      <p class="mt-1 text-xs text-slate-400">Чтобы добавить карточку, нужно заполнить данные</p>
      <Form/>
    </div>
  </div>
</template>

<style scoped>

</style>
