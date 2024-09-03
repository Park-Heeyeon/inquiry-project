import { useLocation, Link, useNavigate } from "react-router-dom";
import { formatDate } from "../common";
import {
  hideModal,
  showModal,
  startLoading,
  stopLoading,
} from "../common/redux";
import ConfirmPopup from "./popup/ConfirmPopup";
import DecisionPopup from "./popup/DecisionPopup";
import { delUserInquiry } from "../common/axios";

const InquiryDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inquiryItem = location.state.data.item || "";

  const delInquiryAction = () => {
    showModal(DecisionPopup, {
      content: "삭제하시겠습니까?",
      onConfirm: () => {
        hideModal();
        startLoading();
        delUserInquiry(inquiryItem.id)
          .then((res) => {
            showModal(ConfirmPopup, {
              content: "정상적으로 삭제되었습니다.",
              onConfirm: () => {
                navigate("/InquiryPage");
              },
            });
          })
          .catch((error) => {
            showModal(ConfirmPopup, {
              content: "죄송합니다<br/>오류가 발생했습니다.",
            });
          })
          .finally(() => stopLoading());
      },
    });
  };

  return (
    <div className="inquiry-detail">
      <div className="title-box">
        <Link
          to="/InquiryPage"
          style={{ textDecoration: "none", color: "#000" }}
          state={{ tabIdx: 1 }}
        >
          <i className="fa-solid fa-chevron-left" style={{ color: "#000" }} />
          1:1문의하기
        </Link>
      </div>
      {!!inquiryItem ? (
        <div className="card-box">
          <div className="card">
            <div className="card-header">
              <i className="fa-solid fa-q fa-lg" />
              {inquiryItem.title}
              <br />
              {inquiryItem.content}
            </div>
            {!!inquiryItem.answer && (
              <div className="card-body">
                <i className="fa-solid fa-a fa-lg" />
                {inquiryItem.answer.title}
                <br />
                {inquiryItem.answer.content}
                <div className="date-box">
                  답변일:
                  <span>
                    {formatDate(new Date(inquiryItem.answer.answeredDate))}
                  </span>
                </div>
              </div>
            )}
          </div>
          {!inquiryItem.answer && (
            <div className="btn-box">
              <button
                type="button"
                className="btn btn-light"
                onClick={delInquiryAction}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      ) : (
        showModal(ConfirmPopup, {
          content: "죄송합니다.<br/>오류가 발생했습니다.",
        })
      )}
    </div>
  );
};
export default InquiryDetail;
