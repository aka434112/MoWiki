<template>
  <div class="mowiki__nav-menu__container">
    <el-menu
      :class="[
        'mowiki__nav-menu',
        menuCollapsed ? '' : 'mowiki__nav-menu--expanded',
      ]"
      :collapse="menuCollapsed"
      :collapse-transition="false"
      :default-active="ROUTE_NAMES.HOME"
    >
      <div class="mowiki__nav-menu__logo-container">
        <div class="mowiki__nav-menu__title-container">
          <img :src="MowikiLogo" class="mowiki__nav-menu__logo" />
          <h1 v-show="!menuCollapsed" class="mowiki__nav-menu__title">
            {{ t('title') }}
          </h1>
        </div>
        <button
          class="mowiki__nav-menu__collapse-control"
          @click="menuCollapsed = !menuCollapsed"
        >
          <i-ep-d-arrow-right v-if="menuCollapsed" />
          <i-ep-d-arrow-left v-else />
        </button>
      </div>

      <div class="mowiki__nav-menu__items">
        <router-link
          v-for="route in Object.values(ROUTE_NAMES)"
          :key="route"
          :to="{
            name: route,
          }"
        >
          <el-menu-item :index="route">
            <component
              :is="ROUTE_ICONS[route]"
              class="mowiki__nav-menu__item-icon"
            />
            <template #title>
              {{ navigationLabels[route] }}
            </template>
          </el-menu-item>
        </router-link>
      </div>
    </el-menu>
    <section
      :class="[
        'mowiki__nav-menu__section',
        menuCollapsed ? '' : 'mowiki__nav-menu__section--expanded-sidebar',
      ]"
    >
      <slot></slot>
    </section>
  </div>
</template>

<script lang="ts">
  import { useI18n } from 'vue-i18n'
  import { defineComponent, ref } from 'vue'

  import MowikiLogo from '@/../public/icons/film-strip-roll.ico'

  import { HomeFilled } from '@element-plus/icons-vue'

  import { ROUTE_NAMES, ROUTE_ICONS } from '@/const/route-details'
  import { useNavigationLabels } from '@/composables/navigation'

  export default defineComponent({
    setup() {
      const { t } = useI18n()
      const menuCollapsed = ref(true)
      const navigationLabels = useNavigationLabels(t)

      return {
        t,
        MowikiLogo,
        ROUTE_NAMES,
        ROUTE_ICONS,
        HomeFilled,
        menuCollapsed,
        navigationLabels,
      }
    },
  })
</script>

<style lang="scss" scoped>
  $collapsed-menu-width: var(--mowiki-collapsed-sidebar-width);
  .el-menu--collapse {
    :deep(.el-menu-tooltip__trigger) {
      margin-left: calc(
        (($collapsed-menu-width - (2 * var(--el-menu-base-level-padding))) / 2) /
          2
      );
    }
  }
  .mowiki__nav-menu__container {
    @apply flex items-start h-full;
    .mowiki__nav-menu__section {
      @apply h-full flex-grow;
      margin-left: $collapsed-menu-width;
      &--expanded-sidebar {
        margin-left: var(--mowiki-expanded-sidebar-width);
      }
    }
    .mowiki__nav-menu {
      width: $collapsed-menu-width;
      @apply fixed h-[100vh] pt-2 z-[var(--mowiki-sidebar-z-index)];
      .el-menu-item {
        @apply flex gap-x-3 text-lg;
      }
      &__collapse-control {
        transform: translateX(75%);
        @apply cursor-pointer absolute z-[var(--mowiki-sidebar-z-index)] p-2 top-0 right-0 bg-white border-none shadow;
      }
      &--expanded {
        width: var(--mowiki-expanded-sidebar-width);
      }
      &__logo {
        @apply w-[3vw] pl-[var(--el-menu-base-level-padding)];
      }
      &__title {
        @apply text-2xl;
      }
      &__items {
        @apply pt-8;
        & > a {
          @apply no-underline;
        }
      }
      &__item-icon {
        @apply h-6;
      }
      &__logo-container {
        @apply relative;
      }
      &__title-container {
        @apply flex items-center gap-x-4;
      }
    }
  }
</style>
