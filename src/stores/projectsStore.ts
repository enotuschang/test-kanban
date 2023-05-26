import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useProjectsStore = defineStore('projectsStore', () => {
  const setProjectList = (val: any) => {
    projectList.value = val
  }
  const setSelectedProject = (val: string) => {
    selectedProject.value = val
  }
  const getProjectByCode = (code: string) => projectList.value.find((elem: any) => elem.code === code)
  const projectList = ref([])
  const selectedProject = ref('')

  return {projectList, selectedProject, setProjectList, setSelectedProject, getProjectByCode}
})
