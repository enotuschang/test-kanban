<script setup lang="ts">
import {ref, computed} from 'vue'
import {useProjectsStore} from '../stores/projectsStore'
import {useColumnsStore} from '../stores/columnsStore'
import {useCardsStore} from '../stores/cardsStore'

const editCard = (card: any) => {
  cardsStore.setSelectedCard(card)
  columnsStore.setSelectedColumn(card.stage)
}

const projectsStore = useProjectsStore()
const columnsStore = useColumnsStore()
const cardsStore = useCardsStore()

const props = defineProps(['data'])
const CardData = ref(props.data)

const card = computed(() => CardData.value)
const projectName = computed(() => projectsStore.getProjectByCode(card.value.project))
</script>

<template>
  <div class="card grid gap-4 p-3 pr-2 bg-white text-slate-700 rounded">
    <div class="card--content flex flex-col">
      <div class="flex items-center">
        <h3 class="mr-1 font-semibold text-sm">{{ card.title }}</h3>
        <button class="ml-1 text-slate-500" type="button" @click="editCard(card)">
          <svg class="w-4 h-4 fill-current">
            <use xlink:href="#NoteEdit"></use>
          </svg>
        </button>
        <button class="ml-1 text-slate-500" type="button">
          <svg class="w-4 h-4 fill-current">
            <use xlink:href="#Garbage"></use>
          </svg>
        </button>
      </div>
      <p class="mt-2 text-xs"><span class="text-slate-500">Балл:</span> <span class="font-semibold">{{ card.score }}</span></p>
      <p class="w-max px-2 py-1 mt-auto bg-slate-200 text-slate-500 border border-slate-300 text-xs rounded" v-if="card.project">{{ projectName.name }}</p>
    </div>
    <button class="self-start text-slate-400" type="button">
      <svg class="w-4 h-4 fill-current">
        <use xlink:href="#OverflowMenuSecond"></use>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.card {
  grid-template-columns: 1fr auto;
  min-height:120px;
}
</style>
