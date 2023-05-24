<script setup lang="ts">
import {computed} from 'vue'
import {useProjectsStore} from '../stores/projectsStore'
import {useColumnsStore} from '../stores/columnsStore'
import Column from './Column.vue'

const projectsStore = useProjectsStore()
const columnsStore = useColumnsStore()

const projects = computed(() => projectsStore.projectList)
const columns = computed(() => columnsStore.columnList)
</script>

<template>
  <div class="kanban w-full px-5">
    <header class="flex justify-between items-center gap-3 flex-wrap">
      <h1 class="text-3xl text-slate-700 font-bold grow md:grow-0">Карточки</h1>
      <div class="flex items-center gap-2 flex-wrap">
        <label class="flex items-center gap-2 md:whitespace-nowrap grow md:grow-0 text-slate-500 text-xs">Проект:
          <select class="grow px-4 py-2 bg-slate-300 text-slate-500 text-sm rounded" name="project" id="project">
            <option value="0" v-text="'Не выбрано'"/>
            <option v-for="(project, index) in projects" :value="project.code" :key="index" v-text="project.name"/>
          </select>
        </label>
        <button class="grow md:grow-0 px-5 py-2 bg-sky-300 text-white text-sm rounded" type="button">Добавить карточку
        </button>
        <button class="grow md:grow-0 px-5 py-2 bg-sky-300 text-white text-sm rounded" type="button">Сохранить
          изменения
        </button>
      </div>
    </header>
    <main class="kanban--body grid items-start gap-5 mt-5">
      <Column v-for="(column, index) in columns" :data="column" :key="index"/>
    </main>
  </div>
</template>

<style scoped>
.kanban {
  max-width:1380px;
}

.kanban--body {
  grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));
}


</style>
