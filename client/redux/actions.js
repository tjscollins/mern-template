// userSession actions

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  };
};

// errorLog actions

export const errorLog = (error) => {
  return {
    type: 'ERROR_LOG',
    error,
  };
};
