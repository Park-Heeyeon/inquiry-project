const MODAL_OPEN = "MODAL_OPEN";
const MODAL_CLOSE = "MODAL_CLOSE";

export const openModal = (component, content, onConfirm) => {
  return {
    type: MODAL_OPEN,
    component,
    content,
    onConfirm,
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE,
  };
};

const initialState = {
  Component: null,
  isOpen: false,
  content: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        isOpen: true,
        Component: action.component,
        content: action.content,
        onConfirm: action.onConfirm,
      };
    case MODAL_CLOSE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
export default modalReducer;
