import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useColumnsStore = defineStore('columnsStore', () => {
  const setColumnList = (val: any) => {
    columnList.value = val
  }
  const setSelectedColumn = (val: any) => {
    selectedColumn.value = val
  }

  const setTargetColumn = (val: any) => {
    targetColumn.value = val
  }
  const getColumnByCode = (val: string) => columnList.value.find(({code}) => code === val)
  const columnList = ref([])
  const selectedColumn = ref(null)
  const targetColumn = ref(null)

  return {columnList, selectedColumn, targetColumn, setColumnList, setSelectedColumn, setTargetColumn, getColumnByCode}
})
