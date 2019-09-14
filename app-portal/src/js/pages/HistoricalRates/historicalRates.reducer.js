export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXCHANGE':
      return {
        ...state,
        exchange: action.value
      };

    case 'SET_DATES':
      return {
        ...state,
        dates: action.value
      }

    default:
      return {
        ...state
      };
  }
}