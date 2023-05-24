<script setup lang="ts">

</script>

<template>
  <div class="kanban w-full px-5">
    <header class="flex justify-between items-center gap-3 flex-wrap">
      <h1 class="text-3xl font-bold grow md:grow-0">Карточки</h1>
      <div class="kanban--toolbar flex items-center gap-2 flex-wrap">
        <label class="flex items-center gap-2 md:whitespace-nowrap grow md:grow-0 text-slate-500 text-xs">Проект:
          <select class="grow px-4 py-2 bg-slate-300 text-slate-500 text-sm rounded" name="project" id="project">
            <option value="0">Не выбрано</option>
          </select>
        </label>
        <button class="grow md:grow-0 px-5 py-2 bg-sky-300 text-white text-sm rounded" type="button">Добавить карточку</button>
        <button class="grow md:grow-0 px-5 py-2 bg-sky-300 text-white text-sm rounded" type="button">Сохранить изменения</button>
      </div>
    </header>
    <main class="kanban--body mt-5">
      Dashboard
    </main>
    </div>
</template>

<style scoped>
.kanban {
  max-width:1360px;
}

.kanban--toolbar {
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.kanban--body {

}
</style>
