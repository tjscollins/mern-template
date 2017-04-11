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
