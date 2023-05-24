import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useCardsStore = defineStore('cardsStore', () => {
  type KanbanCard = {
    id: number,
    title: string,
    stage: string,
    project: boolean | string,
    score: number
  }
  const setCardList = (val: KanbanCard) => {
    cardList.value = val
  }
  const getCardList = (stage: string) => cardList.value.filter((elem: KanbanCard) => elem.stage === stage)
  const cardList = ref([])

  return {cardList, getCardList, setCardList}
})
