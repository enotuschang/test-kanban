<script setup lang="ts">
import {useProjectsStore} from './stores/projectsStore'
import {useColumnsStore} from './stores/columnsStore'
import {useCardsStore} from './stores/cardsStore'

const projectsStore = useProjectsStore()
const columnsStore = useColumnsStore()
const cardsStore = useCardsStore()

fetch('/mockData/kanbanProjects.json')
    .then(resp => resp.json())
    .then(resp => projectsStore.setProjectList(resp))
    .catch(err => console.error(err))

fetch('/mockData/kanbanColumns.json')
    .then(resp => resp.json())
    .then(resp => columnsStore.setColumnList(resp))
    .catch(err => console.error(err))

fetch('/mockData/kanbanCards.json')
    .then(resp => resp.json())
    .then(resp => cardsStore.setCardList(resp))
    .catch(err => console.error(err))
</script>

<template>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style scoped>
</style>
