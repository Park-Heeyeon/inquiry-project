import { useLocation, useNavigate } from "react-router-dom";
import dompurify from "dompurify";
import { hideModal } from "../../common/redux";
const ConfirmPopup = ({ content, onConfirm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sanitizer = dompurify.sanitize;
  const { pathname } = location;

  // 상세페이지에서 뒤로가기를 눌렀을 경우 메인화면으로 이동
  const confirmBtnHandler = () => {
    if (pathname.includes("/inquiryDetail")) navigate("/");
    hideModal();
    if (onConfirm) onConfirm();
  };

  return (
    <>
      <div
        className="content-box"
        dangerouslySetInnerHTML={{
          __html: sanitizer(
            !!content ? content : "죄송합니다.<br/>오류가 발생했습니다."
          ),
        }}
      ></div>
      <div className="btn-box">
        <button
          className="btn btn-primary"
          type="button"
          onClick={confirmBtnHandler}
        >
          확인
        </button>
      </div>
    </>
  );
};
export default ConfirmPopup;
