<template>
  <div v-loading="fetchingMovies" class="mowiki__home">
    <el-input
      class="mowiki__home__search-input"
      :model-value="searchQuery"
      :placeholder="t('module_home.search_placeholder')"
      :prefix-icon="Search"
      clearable
      @update:model-value="
        (newSearchQuery) => {
          searchQuery = newSearchQuery
          debouncedMovieFetching()
        }
      "
    />
    <movies-container
      :movies="movies"
      :favorites="favorites"
      @update:favorites="setFavorites($event)"
      class="mowiki__home__movies-container"
    />
    <el-pagination
      v-if="total"
      :current-page="page"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
      @update:current-page="
        (updatedPage) => {
          page = updatedPage
          _fetchMovies()
        }
      "
    />
  </div>
</template>

<script lang="ts">
  import { useI18n } from 'vue-i18n'
  import { defineComponent, onMounted, ref, Ref } from 'vue'

  import { Search } from '@element-plus/icons-vue'
  import { Movie } from '@/components/common/MovieCard.vue'
  import MoviesContainer from '@/components/common/MoviesContainer.vue'

  import { debounce } from 'lodash-es'
  import { useFavorites } from '@/composables/favorites'

  import { fetchMovies } from '@/api/services/movies'
  import { IMovie } from '@/api/models/movies-response'

  export default defineComponent({
    components: {
      MoviesContainer,
    },
    setup() {
      const { t } = useI18n()
      const page = ref(1)
      const total = ref(0)
      const searchQuery = ref('')
      const fetchingMovies = ref(false)
      const movies: Ref<Movie[]> = ref([])
      const { favorites, setFavorites } = useFavorites()

      const _fetchMovies = async () => {
        fetchingMovies.value = true
        try {
          const { data, total: _total } = await fetchMovies({
            page: page.value,
            title: searchQuery.value,
          })
          movies.value = ((data || []) as IMovie[]).map(
            (movie) => new Movie(movie)
          )
          total.value = _total
        } catch (err) {
          console.error(err)
        } finally {
          fetchingMovies.value = false
        }
      }
      const debouncedMovieFetching = debounce(() => {
        page.value = 1
        _fetchMovies()
      }, 300)
      onMounted(_fetchMovies)

      return {
        t,
        page,
        total,
        movies,
        fetchingMovies,
        Search,
        searchQuery,
        _fetchMovies,
        debouncedMovieFetching,
        favorites,
        setFavorites,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .mowiki__home {
    &__search-input {
      @apply w-1/3 mb-2;
    }
    &__movies-container {
      @apply mb-[var(--mowiki-pagination-height)];
    }
  }
</style>
