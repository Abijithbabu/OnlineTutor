
const initialState = {
  data: {
    isAuthenticated: false,
    user: null,
  },
  mode: null,
  live: null
}

export function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'user_login':
      return {
        ...state,
        data: {
          isAuthenticated: true, user: payload.user
        }
      };
    case 'user_logout':
      return {
        ...state,
        data: {
          isAuthenticated: false,
        }
      };
    case 'mode':
      return {
        ...state,
        mode: payload
      };
    case 'live':
      return {
        ...state,
        live: payload
      };

    default:
      return state;
  }
}