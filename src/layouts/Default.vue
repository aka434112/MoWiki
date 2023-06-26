<template>
  <div class="mowiki__layout--default">
    <nav-menu>
      <div class="mowiki__layout--default__view-container">
        <h2 class="mowiki__layout--default__route-title">
          {{ layoutProps[PROP_NAMES.ROUTE_TITLE].value }}
        </h2>
        <router-view class="mowiki__layout--default__view" />
      </div>
    </nav-menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import NavMenu from '@/components/common/NavMenu.vue'

  import { useLayoutProps } from '@/composables/layout-props'
  import { PROP_NAMES, PROP_DEFINITIONS } from '@/const/layout-props'

  export default defineComponent({
    components: {
      NavMenu,
    },
    props: {
      ...PROP_DEFINITIONS,
    },
    setup(props) {
      const layoutProps = useLayoutProps(props)
      return {
        PROP_NAMES,
        layoutProps,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .mowiki__layout--default {
    @apply h-full;
    &__view-container {
      @apply px-8 flex flex-col h-full;
    }
    &__view {
      @apply flex-grow;
    }
    &__route-title {
      @apply font-semibold text-xl;
    }
  }
</style>
