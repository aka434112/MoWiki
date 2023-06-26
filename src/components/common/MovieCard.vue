<template>
  <el-card shadow="hover" class="mowiki__movie-card">
    <template #header>
      <div class="mowiki__movie-card__title-container">
        <el-tooltip :content="movie.title">
          <div class="mowiki__movie-card__title">
            {{ movie.title }}
          </div>
        </el-tooltip>
        <div
          role="button"
          tabindex="0"
          class="mowiki__movie-card__star"
          @click="$emit('update:starred', !movie.starred)"
        >
          <i-ep-star-filled v-if="movie.starred" color="#FFE500" />
          <i-ep-star v-else />
        </div>
      </div>
    </template>
    <div class="mowiki__movie-card__details">
      <div class="mowiki__movie-card__year-container">
        <div class="mowiki__movie-card__year">
          {{ t('movie_card.year_of_release') }}
        </div>
        <div class="mowiki__movie-card__year-value">
          {{ movie.year }}
        </div>
      </div>
      <a :href="`https://www.imdb.com/title/${movie.imdbId}`" target="_blank">
        <i-ep-top-right />
        &nbsp;
        {{ t('movie_card.goto_imdb') }}
      </a>
    </div>
  </el-card>
</template>

<script lang="ts">
  import { useI18n } from 'vue-i18n'
  import { defineComponent, PropType } from 'vue'

  export const MOVIE_CARD_CONSTRUCTOR_FIELDS = Object.freeze({
    TITLE: 'Title',
    YEAR: 'Year',
    IMDB_ID: 'imdbID',
    STARRED: 'starred',
  })
  const MOVIE_CARD_FIELDS = Object.freeze({
    TITLE: 'movie_title',
    YEAR: 'release_year',
    IMDB_ID: 'imdb_id',
    STARRED: 'movie_starred',
  })
  export class Movie {
    constructor(data?) {
      this.title = data?.[MOVIE_CARD_CONSTRUCTOR_FIELDS.TITLE]
      this.imdbId = data?.[MOVIE_CARD_CONSTRUCTOR_FIELDS.IMDB_ID]
      this.year = data?.[MOVIE_CARD_CONSTRUCTOR_FIELDS.YEAR]
      this.starred = data?.[MOVIE_CARD_CONSTRUCTOR_FIELDS.STARRED]
    }

    get title() {
      return this[MOVIE_CARD_FIELDS.TITLE]
    }
    set title(title) {
      this[MOVIE_CARD_FIELDS.TITLE] = title
    }
    get year() {
      return this[MOVIE_CARD_FIELDS.YEAR]
    }
    set year(year) {
      this[MOVIE_CARD_FIELDS.YEAR] = year
    }
    get imdbId() {
      return this[MOVIE_CARD_FIELDS.IMDB_ID]
    }
    set imdbId(imdbId) {
      this[MOVIE_CARD_FIELDS.IMDB_ID] = imdbId
    }
    get starred() {
      return this[MOVIE_CARD_FIELDS.STARRED]
    }
    set starred(starred) {
      this[MOVIE_CARD_FIELDS.STARRED] = starred
    }
  }

  export default defineComponent({
    props: {
      movie: {
        type: Object as PropType<Movie>,
        required: true,
      },
    },
    emits: ['update:starred'],
    setup() {
      const { t } = useI18n()
      return { t }
    },
  })
</script>

<style lang="scss" scoped>
  .mowiki__movie-card {
    @apply w-80 h-32;
    &__title {
      @apply w-3/4 truncate text-sm font-semibold;
    }
    &__title-container {
      @apply flex justify-between items-center;
    }
    &__star {
      @apply cursor-pointer;
    }
    &__year {
      @apply font-normal text-xs;
    }
    &__year-value {
      @apply font-medium text-xs;
    }
    &__details {
      @apply flex justify-between;
      a {
        @apply text-xs text-link no-underline flex items-center;
      }
    }
  }
</style>
