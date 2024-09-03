import { openModal, closeModal } from "../redux/modules/modalReducer";
import { openLoading, closeLoading } from "../redux/modules/loadingReducer";
import { deliverInfo } from "../redux/modules/userInfoReducer";

let _store = null;

export const init = (store) => {
  _store = store;
};

// 공통 모달
export const showModal = (component, { content, onConfirm, data }) => {
  _store.dispatch(openModal(component, content, onConfirm, data));
};
export const hideModal = () => {
  _store.dispatch(closeModal());
};

// 공통 로딩
export const startLoading = () => {
  _store.dispatch(openLoading());
};
export const stopLoading = () => {
  _store.dispatch(closeLoading());
};

// 사용자 정보 저장
export const saveUserInfo = (email) => {
  _store.dispatch(deliverInfo(email));
};
