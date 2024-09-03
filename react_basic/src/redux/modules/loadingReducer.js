const OPEN_LOADING = "OPEN_LOAING";
const CLOSE_LOADING = "CLOSE_LOADING";

export const openLoading = () => {
  return {
    type: OPEN_LOADING,
  };
};

export const closeLoading = () => {
  return {
    type: CLOSE_LOADING,
  };
};

const initialState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOADING:
      return {
        isLoading: true,
      };
    case CLOSE_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
};
export default loadingReducer;
