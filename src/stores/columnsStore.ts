import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useColumnsStore = defineStore('columnsStore', () => {
  type KanbanColumn = {
    id: number,
    sort: number,
    name: string,
    code: string
  }
  const setColumnList = (val: KanbanColumn) => {
    columnList.value = val
  }
  const columnList = ref([])
  const getColumnList = computed(() => columnList.value)

  return {columnList, getColumnList, setColumnList}
})
