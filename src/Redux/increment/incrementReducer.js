import { THEME_TOG } from './incrementTypes'

const initialState = {
  theme: "light"
}

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_TOG: return {
      ...state,
      theme: state.theme =="light" ? "dark" : "light"
    }

    default: return state
  }
}

export default countReducer