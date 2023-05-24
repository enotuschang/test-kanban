<script setup lang="ts">
import {ref, computed} from 'vue'
import {useProjectsStore} from '../stores/projectsStore'

const projectsStore = useProjectsStore()

const props = defineProps(['data'])
const CardData = ref(props.data)

const card = computed(() => CardData.value)
const projectName = computed(() => projectsStore.getProjectByCode(card.value.project))
</script>

<template>
  <div class="card grid items-start gap-4 p-3 pr-2 bg-white text-slate-700 rounded">
    <div class="card--content">
      <h3 class="font-semibold text-sm">{{ card.title }}</h3>
      <p>{{ card.score }}</p>
      <p class="w-max px-2 py-1 bg-slate-200 text-slate-500 border border-slate-300 text-sm rounded" v-if="card.project">{{ projectName.name }}</p>
    </div>
    <button class="w-4 h-4" type="button">::</button>
  </div>
</template>

<style scoped>
.card {
  grid-template-columns: 1fr auto;
  min-height:120px;
}
</style>
