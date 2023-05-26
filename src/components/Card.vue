<script setup lang="ts">
import {ref, computed} from 'vue'
import {useProjectsStore} from '../stores/projectsStore'
import {useColumnsStore} from '../stores/columnsStore'
import {useCardsStore} from '../stores/cardsStore'

const editCard = (card: any) => {
  cardsStore.setSelectedCard(card)
  columnsStore.setSelectedColumn(card.stage)
}

const startDrag = (data: any, evt: any) => {
  draggableCardElement.value = evt.currentTarget.closest('.card')
  if(!draggableCardElement.value) return
  draggableCard.value = data
  oldMouse.value.x = evt.x
  oldMouse.value.y = evt.y
  draggableCardElement.value.style.width = draggableCardElementRect.value.width + 'px'
  draggableCardElement.value.style.height = draggableCardElementRect.value.height + 'px'
  draggableCardElement.value.style.left = draggableCardElementRect.value.left + 'px'
  draggableCardElement.value.style.top = draggableCardElementRect.value.top + 'px'
  draggableCardElement.value.classList.add('draggable')
  window.addEventListener('mousemove', moveCard)
  window.addEventListener('mouseup', stopDrag)
}

const moveCard = (evt: any) => {
  const mouseXOffset = evt.x - oldMouse.value.x
  const mouseYOffset = evt.y - oldMouse.value.y
  draggableCardElement.value.style.left = (draggableCardElementRect.value.left + mouseXOffset) + 'px'
  draggableCardElement.value.style.top = (draggableCardElementRect.value.top + mouseYOffset) + 'px'
}

const stopDrag = () => {
  const targetColumn = computed(() => columnsStore.targetColumn)
  draggableCardElement.value.classList.remove('draggable')
  oldMouse.value = {x: 0, y: 0}

  window.removeEventListener('mousemove', moveCard)
  window.removeEventListener('mouseup', stopDrag)

  if(!targetColumn.value) return

  draggableCard.value.stage = targetColumn.value
  columnsStore.setTargetColumn(null)
}

const projectsStore = useProjectsStore()
const columnsStore = useColumnsStore()
const cardsStore = useCardsStore()

const props = defineProps(['id'])
const id = ref(props.id)
const draggableCard: any = ref(null)
const draggableCardElement: any = ref(null)
const draggableCardElementRect = computed(() => draggableCardElement.value.getBoundingClientRect())
const oldMouse: any = ref({x: 0, y: 0})

const card = computed(() => cardsStore.getCardById(id.value))
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
        <button class="ml-1 text-slate-500" type="button" @click="cardsStore.delCardById(card.id)">
          <svg class="w-4 h-4 fill-current">
            <use xlink:href="#Garbage"></use>
          </svg>
        </button>
      </div>
      <p class="mt-2 text-xs"><span class="text-slate-500">Балл:</span> <span class="font-semibold">{{ card.score }}</span></p>
      <p class="w-max px-2 py-1 mt-auto bg-slate-200 text-slate-500 border border-slate-300 text-xs rounded" v-if="card.project">{{ projectName.name }}</p>
    </div>
    <button class="self-start text-slate-400"
            type="button"
            @mousedown="(evt) => startDrag(card, evt)">
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

.card.draggable {
  position:fixed;
  pointer-events:none;
  box-shadow: 0 0 10px rgba(0, 0, 0, .25);
}
</style>
