import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LoginPage from "./component/LoginPage";
import InquiryPage from "./component/InquiryPage";
import InquiryDetail from "./component/InquiryDetail";
import ModalContainer from "./component/ModalContainer";
import NotFound from "./component/NotFound";
import Modal from "react-modal";
import LoadingBar from "./component/LoadingBar";

function App() {
  const { isLoading } = useSelector((state) => state.loadingReducer);
  return (
    <>
      {isLoading && <LoadingBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/InquiryPage" element={<InquiryPage />} />
        <Route path="/InquiryDetail" element={<InquiryDetail />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ModalContainer />
    </>
  );
}
Modal.setAppElement("#root"); //App.js

export default App;
