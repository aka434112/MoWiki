import { ref, Ref, computed, ComputedRef } from 'vue'

import { Movie } from '@/components/common/MovieCard.vue'

const state: Ref<Movie[]> = ref([])

export const useFavorites = () => {
  return {
    setFavorites: (favorites: Movie[]) => {
      state.value = favorites
    },
    favorites: computed(() => state.value) as ComputedRef<Movie[]>,
  }
}

export default useFavorites
