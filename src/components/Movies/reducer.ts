import { RootAction } from '../../store/rootAction';
import { moviesActionTypes } from './actions';
import { MoviesState } from './types';

export const initialState: MoviesState = {
  fetchingGenres: false,
  genres: {},
  fetchingMovies: false,
  currentPage: 1,
  currentFilter: 'popular',
  error: null,
  movies: [],
  totalPages: 0
};

export default function(
  state: MoviesState = initialState,
  action: RootAction
): MoviesState {
  switch (action.type) {
    case moviesActionTypes.FETCH_GENRES_REQUEST:
    case moviesActionTypes.FETCH_GENRES_FAIL:
      return {
        ...state,
        fetchingGenres: false
      };
    case moviesActionTypes.FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload.genres.reduce(
          (acc, genre) => ({ ...acc, [genre.id]: genre.name }),
          {}
        )
      };
    case moviesActionTypes.FETCH_MOVIES_REQUEST:
      return {
        ...state,
        fetchingMovies: true
      };
    case moviesActionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        fetchingMovies: false,
        movies: action.payload.results,
        totalPages: action.payload.totalPages,
        error: null
      };
    case moviesActionTypes.FETCH_MOVIES_FAIL:
      return {
        ...state,
        fetchingMovies: false,
        error: action.payload
      };
    case moviesActionTypes.SET_CURRENT_FILTER:
      return {
        ...state,
        currentFilter: action.payload
      };
    case moviesActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
}
