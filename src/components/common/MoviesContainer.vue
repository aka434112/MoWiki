<template>
  <div class="mowiki__movies-container">
    <movie-card
      v-for="movie in _movies"
      :key="`${movie.title}${movie.imdbId}`"
      :movie="movie"
      @update:starred="
        $emit(
          'update:favorites',
          $event
            ? favorites.concat(movie)
            : favorites.filter((_movie) => _movie.imdbId !== movie.imdbId)
        )
      "
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue'

  import MovieCard, { Movie } from './MovieCard.vue'

  export default defineComponent({
    components: {
      MovieCard,
    },
    props: {
      movies: {
        type: Array as PropType<Movie[]>,
        required: true,
      },
      favorites: {
        type: Array as PropType<Movie[]>,
        default: () => [],
      },
    },
    emits: ['update:favorites'],
    setup(props) {
      const _movies = computed(() =>
        props.movies?.map((movie) => {
          const updatedMovie = new Movie()
          updatedMovie.imdbId = movie.imdbId
          updatedMovie.starred = !!(props.favorites || []).find(
            (favoriteMovie) => favoriteMovie.imdbId === movie.imdbId
          )
          updatedMovie.title = movie.title
          updatedMovie.year = movie.year
          return updatedMovie
        })
      )
      return {
        Movie,
        _movies,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .mowiki__movies-container {
    @apply flex flex-wrap gap-y-4 gap-x-4;
  }
</style>
