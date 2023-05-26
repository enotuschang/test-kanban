import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useCardsStore = defineStore('cardsStore', () => {
  const setCardList = (val: any) => {
    cardList.value = val
  }
  const setSelectedCard = (val: any) => {
    selectedCard.value = val
  }
  const getCardList = (stage: string) => cardList.value.filter((elem: any) => elem.stage === stage)
  const cardList = ref([])
  const selectedCard = ref(null)

  return {cardList, selectedCard, getCardList, setCardList, setSelectedCard}
})
