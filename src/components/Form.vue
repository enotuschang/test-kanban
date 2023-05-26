<script setup lang="ts">
import {ref, computed} from 'vue'
import {useProjectsStore} from '../stores/projectsStore'
import {useColumnsStore} from '../stores/columnsStore'

const projectsStore = useProjectsStore()
const columnsStore = useColumnsStore()

const props = defineProps(['columnData', 'cardData', 'isModalForm'])
const columnData = ref(props.columnData)
const cardData = ref(props.cardData)
const isModalForm = ref(props.isModalForm)

const cardName = ref(cardData?.value?.title || '')
const cardScore = ref(cardData?.value?.score || 0)

const submitButtonText = cardData.value ? 'Сохранить' : 'Добавить'

const projectList = computed(() => projectsStore.getProjectList)
const columnList = computed(() => columnsStore.getColumnList)
const currentProject = computed(() => cardData?.value?.project)
</script>

<template>
  <form class="grid gap-5 mt-5" action="">
    <label class="text-xs text-slate-400">Заголовок *:<br>
      <input class="form--input w-full px-4 py-2 mt-1 text-sm text-slate-700 bg-slate-200 rounded"
             maxlength="70"
             type="text"
             required
             v-model="cardName">
    </label>
    <!-- @todo прикрутить плагин для кастомизации select -->
    <label class="form--select relative text-xs text-slate-400">Проект:<br>
      <select class="w-full pl-4 pr-8 py-2 mt-1 text-sm text-slate-700 bg-slate-200 rounded" name="project"
              id="project">
        <option class="bg-white" value="0">Не выбрано</option>
        <option class="bg-white"
                value="{{ project.code }}"
                v-for="(project, index) in projectList"
                :selected="project.code === currentProject"
                :key="index">
          {{ project.name }}
        </option>
      </select>
      <svg class="w-4 h-4 absolute right-2 bottom-[10px] fill-slate-500">
        <use xlink:href="#ChevronDown"></use>
      </svg>
    </label>
    <!-- @todo прикрутить плагин для кастомизации select -->
    <label v-if="!isModalForm || cardData" class="form--select relative text-xs text-slate-400">Стадия *:<br>
      <select class="w-full pl-4 pr-8 py-2 mt-1 text-sm text-slate-700 bg-slate-200 rounded" name="stage"
              id="stage">
        <option class="bg-white" value="0">Не выбрано</option>
        <option class="bg-white"
                value="{{ column.code }}"
                v-for="(column, index) in columnList"
                :selected="column.code === columnData"
                :key="index">
          {{ column.name }}
        </option>
      </select>
      <svg class="w-4 h-4 absolute right-2 bottom-[10px] fill-slate-500">
        <use xlink:href="#ChevronDown"></use>
      </svg>
    </label>
    <label class="text-xs text-slate-400">Балл *:<br>
      <input class="w-20 form--input px-4 py-2 mt-1 text-sm text-slate-700 bg-slate-200 rounded"
             type="text"
             pattern="\d+\.\d*"
             placeholder="0.0"
             required
             v-model="cardScore">
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
