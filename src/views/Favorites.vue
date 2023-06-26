<template>
  <section class="mowiki__favorites">
    <movies-container
      v-if="favorites?.length"
      :movies="favorites"
      :favorites="favorites"
      @update:favorites="setFavorites($event)"
    />
    <template v-else>
      <div class="mowiki__favorites--no-favorites">
        <img :src="NoFavorites" />
        <p>
          {{ t('module_favorites.no_favorites') }}
        </p>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
  import { useI18n } from 'vue-i18n'
  import { defineComponent } from 'vue'

  import NoFavorites from '@/../public/icons/no-favorites.svg'
  import MoviesContainer from '@/components/common/MoviesContainer.vue'

  import { useFavorites } from '@/composables/favorites'

  export default defineComponent({
    components: {
      MoviesContainer,
    },
    emits: ['update:favorites'],
    setup() {
      const { t } = useI18n()
      const { favorites, setFavorites } = useFavorites()

      return {
        t,
        favorites,
        setFavorites,
        NoFavorites,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .mowiki__favorites {
    &--no-favorites {
      @apply flex flex-col h-full items-center justify-center;
      img {
        @apply h-40;
      }
      p {
        @apply text-sm font-semibold block;
      }
    }
  }
</style>
