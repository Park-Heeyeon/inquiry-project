const DELIVER_INFO = "DELIVER_INFO";

export const deliverInfo = (email) => {
  console.log("희연 email", email);
  return {
    type: DELIVER_INFO,
    email,
  };
};

const initialState = {
  email: "",
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELIVER_INFO:
      return {
        email: action.email,
      };
    default:
      return state;
  }
};
export default userInfoReducer;
