import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useCardsStore = defineStore('cardsStore', () => {
  const setCardList = (val: any) => {
    val.forEach((item: any) => cardList.value.set(item.id, item))
  }
  const setSelectedCard = (val: any) => {
    selectedCard.value = val
  }
  const delCardById = (id: number) => {
    cardList.value.delete(id)
  }
  const updateCard = (card: any) => {
    cardList.value.set(card.id, card)
  }
  const getCardList = (stage: string) => [...cardList.value.values()].filter((elem: any) => elem.stage === stage)
  const getCardById = (id: number) => cardList.value.get(id)
  const getLastId = computed(() => {
    cardList.value
    const list: any = [...cardList.value.keys()].sort((prev: any, next: any) => prev.id - next.id)
    return list.slice(-1)?.[0] || 0
  })
  const cardList = ref(new Map())
  const selectedCard = ref(null)

  return {cardList, selectedCard, setCardList, setSelectedCard, getCardList, getCardById, getLastId, updateCard, delCardById}
})
