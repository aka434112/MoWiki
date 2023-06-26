export interface IMovie {
  Title: string
  Year: number
  imdbID: string
}

export interface IMoviesResponse {
  per_page: number
  page: number
  total: number
  total_pages: number
  data: IMovie[]
}

export default IMoviesResponse
