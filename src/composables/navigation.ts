import { useRouter } from 'vue-router'
import { ComposerTranslation } from 'vue-i18n'
import { ROUTE_NAMES } from '../const/route-details'

const createRouteNameMappings = (mappingFunction: Function) =>
  Object.freeze(
    Object.fromEntries(
      Object.values(ROUTE_NAMES).map((routeName) => [
        routeName,
        mappingFunction(routeName),
      ])
    )
  )

export const useNavigation = () => {
  const { push } = useRouter()
  return createRouteNameMappings((routeName) =>
    push({
      name: routeName,
    })
  )
}

export const sidebarRouteLabel = (t: ComposerTranslation, routeName) =>
  t(`sidebar_routes.${routeName}`)
export const useNavigationLabels = (t: ComposerTranslation) =>
  createRouteNameMappings((routeName) => sidebarRouteLabel(t, routeName))
