export const userSessionReducer = (state ={}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
};

export const errorLogReducer = (state = [], action) => {
  switch(action.type) {
    case 'ERROR_LOG':
      return [
        ...state,
        action.error,
      ];
    default:
      return state;
  }
};
