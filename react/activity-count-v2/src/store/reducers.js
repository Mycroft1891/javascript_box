import C from '../constant'

export const goal = (state=10, action) =>
  (action.type === C.SET_GOAL) ? parseInt(action.payload) : state

export const skiDay = (state=null, action) =>
  (action.type === C.ADD_DAY) ? action.payload : state

export const errors = (state=[], action) => {
  switch (action.type) {
    case C.ADD_ERROR:
      return [...state, action.payload]
    case C.CLEAR_ERROR:
      return state.filter((message, i) => i !== action.payload)
    default:
      return state
  }
}


export const allSkiDays = (state=[], action) => {
  switch (action.type) {
    case C.ADD_DAY:
      const doubleDay = state.some(skiDay => skiDay.date === action.payload.date)
      return (doubleDay) ? state : [...state, action.payload]
    case C.REMOVE_DAY:
      return state.filter((day, i) => day.date !== action.payload)
    default:
      return state
  }
}