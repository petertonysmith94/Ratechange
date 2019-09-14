export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXCHANGE':
      return {
        ...state,
        exchange: action.value
      };

    case 'SWITCH_CURRENCIES':
        return {
          ...state,
          exchange: {
            ...state.exchange,
            base: state.exchange.foreign,
            foreign: state.exchange.base
          }
        };

    default:
      return {
        ...state
      };
  }
}