<script setup lang="ts">
import {ref, computed} from 'vue'
import {useProjectsStore} from '../stores/projectsStore'
import {useColumnsStore} from '../stores/columnsStore'
import {useCardsStore} from '../stores/cardsStore'
import Card from './Card.vue'

const addCard = (code: string) => {
  columnsStore.setSelectedColumn(code)
}

const projectsStore = useProjectsStore()
const columnsStore = useColumnsStore()
const cardsStore = useCardsStore()

const props = defineProps(['data'])
const columnData = ref(props.data)

const isSorted = ref(0)

const selectedProject = computed(() => projectsStore.selectedProject)

const baseCardList = computed(() => cardsStore.getCardList(columnData.value.code))

const cardList = computed(() => {
  const list = ref(baseCardList.value)
  if(selectedProject.value)
    list.value = list.value.filter(({project}) => project === selectedProject.value)
  if(isSorted.value !== 0)
    list.value.sort((prev: any, next: any) => (prev.score - next.score) * isSorted.value)
  return list.value
})
</script>

<template>
  <div class="p-3 bg-slate-300 text-slate-700 rounded">
    <div class="kanban--column-header flex items-center gap-2">
      <h2 class="font-semibold text-base grow">{{ columnData.name }}</h2>
      <div class="flex">
        <button class="text-slate-500" type="button" @click="isSorted = 1">
          <svg class="w-4 h-4 fill-current">
            <use xlink:href="#ArrowDown"></use>
          </svg>
        </button>
        <button class="text-slate-500" type="button" @click="isSorted = -1">
          <svg class="w-4 h-4 fill-current">
            <use xlink:href="#ArrowUp"></use>
          </svg>
        </button>
      </div>
    </div>
    <div class="kanban--card-list grid gap-2 mt-3 empty:rounded">
      <Card v-for="card in cardList" :data="card" :key="`card_${card.id}`"/>
    </div>
    <button class="w-full mt-3 px-5 py-2 text-sm text-slate-500" type="button" @click="addCard(columnData.code)">Добавить</button>
  </div>
</template>

<style scoped>
.kanban--column-header:before {
  content:'';
  flex:0 0 4px;
  border-radius:50%;
  @apply w-1 h-1 bg-slate-500
}

.kanban--card-list:empty {
  min-height:120px;
  @apply items-center border border-slate-400 border-dashed
}

.kanban--card-list:empty:after {
  content:'Список пуст';
  @apply items-center text-sm text-center text-slate-500
}
</style>
