<script setup lang="ts">
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router';
import {useProjectsStore} from '../stores/projectsStore'
import {useColumnsStore} from '../stores/columnsStore'
import {useCardsStore} from '../stores/cardsStore'

const saveCard = (evt: any) => {
  const form = evt.currentTarget
  if (!form) return
  const data = new FormData(form)

  if(!cardModel.value.id)
    cardModel.value.id = cardsStore.getLastId + 1
  if(!cardModel.value.stage)
    cardModel.value.stage = columnList.value[0].code

  Object.entries(cardModel.value).forEach(([key, val]) => {
    if (![...data.keys()].some(item => item === key))
      data.set(key, val)
  })

  cardsStore.updateCard(cardModel.value)
  cardsStore.setSelectedCard(null)
  columnsStore.setSelectedColumn(null)

  // @todo Тут должен вызываться fetch с отправкой данных на API
  // console.log(JSON.parse(JSON.stringify(Object.fromEntries(data.entries()))))

  if (!isModalForm.value) {
    const router = useRouter()
    router.push({name: 'dashboard'})
  }
}

const projectsStore = useProjectsStore()
const columnsStore = useColumnsStore()
const cardsStore = useCardsStore()

const props = defineProps(['columnData', 'cardData', 'isModalForm'])
const columnData = ref(props.columnData)
const cardData = ref(props.cardData)
const isModalForm = ref(props.isModalForm)

const projectList: any = computed(() => projectsStore.projectList)
const columnList: any = computed(() => columnsStore.columnList)

const cardModel = ref({
  id: cardData?.value?.id || false,
  title: cardData?.value?.title || '',
  project: cardData?.value?.project || false,
  stage: cardData?.value?.stage || columnData.value || false,
  score: cardData?.value?.score || 0
})

const submitButtonText = cardData.value ? 'Сохранить' : 'Добавить'
</script>

<template>
  <form class="grid gap-5 mt-5" action="" @submit.prevent="saveCard">
    <label class="text-xs text-slate-400">Заголовок *:<br>
      <input class="form--input w-full px-4 py-2 mt-1 text-sm text-slate-700 bg-slate-200 rounded"
             key="title"
             name="title"
             maxlength="70"
             type="text"
             required
             v-model="cardModel.title">
    </label>
    <!-- @todo прикрутить плагин для кастомизации select -->
    <label class="form--select relative text-xs text-slate-400">Проект:<br>
      <select class="w-full pl-4 pr-8 py-2 mt-1 text-sm text-slate-700 bg-slate-200 rounded"
              name="project"
              v-model="cardModel.project">
        <option class="bg-white" :value="false">Не выбрано</option>
        <option class="bg-white"
                :value="project.code"
                v-for="(project, index) in projectList"
                :key="`project_${index}`">
          {{ project.name }}
        </option>
      </select>
      <svg class="w-4 h-4 absolute right-2 bottom-[10px] fill-slate-500">
        <use xlink:href="#ChevronDown"></use>
      </svg>
    </label>
    <!-- @todo прикрутить плагин для кастомизации select -->
    <label v-if="!isModalForm || cardData" class="form--select relative text-xs text-slate-400">Стадия *:<br>
      <select class="w-full pl-4 pr-8 py-2 mt-1 text-sm text-slate-700 bg-slate-200 rounded"
              name="stage"
              v-model="cardModel.stage">
        <option class="bg-white" :value="false">Не выбрано</option>
        <option class="bg-white"
                :value="column.code"
                v-for="(column, index) in columnList"
                :key="`stage_${index}`">
          {{ column.name }}
        </option>
      </select>
      <svg class="w-4 h-4 absolute right-2 bottom-[10px] fill-slate-500">
        <use xlink:href="#ChevronDown"></use>
      </svg>
    </label>
    <label class="text-xs text-slate-400">Балл *:<br>
      <input class="w-20 form--input pl-4 pr-2 py-2 mt-1 text-sm text-slate-700 bg-slate-200 rounded"
             key="score"
             name="score"
             type="number"
             step="0.1"
             placeholder="0.0"
             required
             v-model.number="cardModel.score">
    </label>
    <fieldset class="flex justify-center items-center gap-1">
      <button class="px-5 py-2 bg-sky-300 text-white text-sm rounded">{{ submitButtonText }}</button>
      <router-link
          v-if="!isModalForm"
          class="px-5 py-2 text-slate-400 text-sm"
          to="/"
          v-text="'Назад'"/>
    </fieldset>
  </form>
</template>

<style scoped>
.form--select select {
  appearance:none;
}

.form--select select::-ms-expand {
  display:none;
}
</style>
