import axios from '../api-client'
import { AxiosRequestConfig } from 'axios'
import { IMoviesRequest } from '../models/movies-request'
import { IMoviesResponse } from '../models/movies-response'

export const fetchMovies = async (
  request: IMoviesRequest,
  config?: AxiosRequestConfig
) => {
  return axios.request({
    ...config,
    url: `/api/movies/search?Title=${encodeURIComponent(
      request.title || ''
    )}&page=${request.page}`,
    method: 'GET',
  }) as unknown as Promise<IMoviesResponse>
}
