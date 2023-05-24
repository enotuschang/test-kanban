<script setup lang="ts">
import {ref, computed} from 'vue'
import {useCardsStore} from '../stores/cardsStore'
import Card from './Card.vue'

const cardsStore = useCardsStore()

const props = defineProps(['data'])
const columnData = ref(props.data)

const cardList = computed(() => cardsStore.getCardList(columnData.value.code))
</script>

<template>
  <div class="p-3 bg-slate-300 text-slate-700 rounded">
    <div class="kanban--column-header flex items-center gap-2">
      <h2 class="font-semibold text-base grow">{{ columnData.name }}</h2>
      <div class="flex">
        <button class="w-4 h-4" type="button"></button>
        <button class="w-4 h-4" type="button"></button>
      </div>
    </div>
    <div class="kanban--card-list grid gap-2 mt-3 empty:rounded">
      <Card v-for="(card, index) in cardList" :data="card" :key="index"/>
    </div>
    <button class="w-full mt-3 px-5 py-2 text-sm text-slate-500" type="button">Добавить</button>
  </div>
</template>

<style scoped>
.kanban--column-header:before {
  content:'';
  flex:0 0 4px;
  width:4px;
  height:4px;
  background:#7D8CA1;
  border-radius:50%;
}

.kanban--card-list:empty {
  align-items:center;
  min-height:120px;
  border:#b9c2ce 1px dashed;
}

.kanban--card-list:empty:after {
  content:'Список пуст';
  font-size:13px;
  font-weight:400;
  line-height:1.21;
  text-align:center;
  color:#7c8ba0;
}
</style>
