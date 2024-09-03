import { hideModal } from "../../common/redux";
import dompurify from "dompurify";
const DecisionPopup = ({ content, onConfirm }) => {
  const sanitizer = dompurify.sanitize;
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
        <button className="btn btn-primary" type="button" onClick={onConfirm}>
          확인
        </button>
        <button
          className="btn cancel-btn btn-secondary"
          type="button"
          onClick={hideModal}
        >
          취소
        </button>
      </div>
    </>
  );
};
export default DecisionPopup;
