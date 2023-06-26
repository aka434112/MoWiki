import { ROUTE_NAMES } from '@/const/route-details'

export default {
  title: 'MoWiki',
  sidebar_routes: {
    [ROUTE_NAMES.HOME]: 'Home',
    [ROUTE_NAMES.FAVORITES]: 'Favorites',
  },
  movie_card: {
    year_of_release: 'Year of release',
    goto_imdb: 'Goto IMDB',
  },
}
