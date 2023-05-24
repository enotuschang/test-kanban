import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useProjectsStore = defineStore('projectsStore', () => {
  type KanbanProject = {
    id: number,
    code: string,
    name: string,
    sort: number
  }
  const setProjectList = (val: KanbanProject) => {
    projectList.value = val
  }
  const getProjectByCode = (code: string) => projectList.value.find((elem: KanbanProject) => elem.code === code)
  const projectList = ref([])
  const getProjectList = computed(() => projectList.value)

  return {projectList, getProjectList, setProjectList, getProjectByCode}
})
