const initialState = {
    user: null
   };
   
   export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_USER':
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
};