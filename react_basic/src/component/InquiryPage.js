import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../common";
import {
  hideModal,
  showModal,
  startLoading,
  stopLoading,
} from "../common/redux";
import { getUserInquiry, postUserInquiry } from "../common/axios";
import ConfirmPopup from "./popup/ConfirmPopup";
import DecisionPopup from "./popup/DecisionPopup";

const TABMENU = ["문의하기", "내 문의내역"];
const OPTIONS = [
  {
    mainOpt: "회원정보",
    subOpts: ["개인정보 변경", "소속변경", "면허/카드 등록", "기타"],
  },
  {
    mainOpt: "카셰어링",
    subOpts: ["예약문의", "반납문의", "결제문의", "도어제어문의", "기타"],
  },
  {
    mainOpt: "차량관제",
    subOpts: ["기타"],
  },
  {
    mainOpt: "기타",
    subOpts: [],
  },
];

const SERVER_OPT = {
  회원정보: "MEMBER_INFO",
  카셰어링: "CAR_SHARING",
  차량관제: "VEHICLE_CONTROL",
  기타: "OTHER",
  "개인정보 변경": "PERSONAL_INFO_CHANGE",
  소속변경: "AFFILIATION_CHANGE",
  "면허/카드 등록": "LICENSE_CARD_REGISTRATION",
  예약문의: "RESERVATION_INQUIRY",
  반납문의: "RETURN_INQUIRY",
  결제문의: "PAYMENT_INQUIRY",
  도어제어문의: "DOOR_CONTROL_INQUIRY",
};

const InquiryPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { state } = useLocation();
  const { email } = useSelector((state) => state.userInfoReducer);
  const { isLoading } = useSelector((state) => state.loadingReducer);

  // 사용자가 선택한 상단 탭메뉴
  const [activeTab, setActiveTab] = useState(0);
  // 사용자가 선택한 문의하기 메인옵션
  const [selMainOpt, setSelMainOpt] = useState("");
  // 사용자가 선택한 문의하기 서브옵션
  const [selSubOpt, setSelSubOpt] = useState("");
  // 문의내역 데이터
  const [inquiryData, setInquiryData] = useState("");

  // 사용자가 선택한 메인옵션에 맞는 서브옵션 필터링
  const filteredOpt = OPTIONS.find((item) => item.mainOpt === selMainOpt);
  const filteredSubOpt = filteredOpt ? filteredOpt.subOpts : "";

  useEffect(() => {
    if (!email)
      showModal(ConfirmPopup, {
        content: "죄송합니다.<br/>오류가 발생했습니다.",
        onConfirm: () => {
          navigate("/");
        },
      });
    if (!!state?.tabIdx) setActiveTab(state.tabIdx);
    getInquiryData();
  }, []);

  // 메인옵션이 바뀔때마다, selSubOpt도 filteredSubOpt의 0번째 데이터로 바꿔준다.
  useEffect(() => {
    if (filteredOpt) setSelSubOpt(filteredSubOpt[0]);
  }, [selMainOpt]);

  const handleGoBack = () => {
    showModal(DecisionPopup, {
      content: "이메일 등록 페이지로 이동하시겠습니까?",
      onConfirm: () => {
        hideModal();
        navigate("/");
      },
    });
  };

  const onSubmit = (data) => {
    if (!selMainOpt) {
      showModal(ConfirmPopup, { content: "항목을 선택해주세요." });
      return;
    }
    if (!data.title) {
      showModal(ConfirmPopup, { content: "제목을 입력해주세요." });
      return;
    }
    if (!data.content) {
      showModal(ConfirmPopup, { content: "내용을 입력해주세요." });
      return;
    }
    postInquiryData(data.title, data.content);
    reset();
  };

  const getInquiryData = () => {
    // 최근에 등록한 순으로 데이터 호출
    startLoading();
    getUserInquiry(email)
      .then((res) => {
        const { data } = res;
        // 내림차순 정렬
        const sortedData = data.sort((a, b) => {
          return new Date(b.registeredDate) - new Date(a.registeredDate);
        });
        setInquiryData(sortedData || []);
      })
      .catch((error) => {
        console.log("희연 error", error);
        showModal(ConfirmPopup, {
          content: "죄송합니다<br/>오류가 발생했습니다.",
        });
      })
      .finally(() => stopLoading());
  };

  const postInquiryData = (title, content) => {
    if (!selMainOpt || !title || !content) return;

    const dataForm = {
      title: title,
      content: content,
      questionCategory: SERVER_OPT[selMainOpt],
      questionDetail: SERVER_OPT[selSubOpt] || "OTHER",
      userEmail: email,
    };

    // 항목, 제목, 내용 모두 입력한 경우 데이터 post
    startLoading();
    postUserInquiry(dataForm)
      .then((res) => {
        showModal(ConfirmPopup, { content: "정상적으로 등록되었습니다." });
        getInquiryData();
      })
      .catch((error) => {
        console.log("희연 error", error);
        showModal(ConfirmPopup, {
          content: "죄송합니다<br/>오류가 발생했습니다.",
        });
      })
      .finally(() => stopLoading());
  };

  const optMapping = (selOpt) => {
    return (
      Object.keys(SERVER_OPT).find((key) => SERVER_OPT[key] === selOpt) ||
      "기타"
    );
  };

  return (
    <div className="inquiry-page">
      <div className="title-box">
        <i
          className="fa-solid fa-chevron-left"
          style={{ color: "#000" }}
          onClick={handleGoBack}
        />
        1:1문의하기
      </div>
      <ul className="nav-box">
        {TABMENU.map((item, idx) => {
          return (
            <li
              key={uuidv4()}
              className={activeTab === idx ? "active" : ""}
              onClick={() => {
                setActiveTab(idx);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
      {activeTab === 0 && (
        <div className="inquiry-form">
          <div className="inquiry-desc">
            이용에 문제가 생기셨나요?
            <br />
            자주 묻는 질문에서 해결할 수도 있어요!
          </div>
          <span className="fnq-shortcut">
            <i
              className="fa-sharp fa-solid fa-circle-question fa"
              style={{ color: "#2b80ff" }}
            />
            자주 묻는 질문 바로가기
            <i
              className="fa-solid fa-chevron-right fa-xs"
              style={{ color: "#303030" }}
            />
          </span>
          <div className="dropdown">
            <div className="main-category">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selMainOpt === "" ? "서비스" : selMainOpt}
              </button>
              <ul className="dropdown-menu">
                {OPTIONS.map((item) => {
                  return (
                    <li
                      key={uuidv4()}
                      className="dropdown-item"
                      onClick={() => {
                        setSelMainOpt(item.mainOpt);
                      }}
                    >
                      {item.mainOpt}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="sub-category">
              <button
                className={`btn btn-light dropdown-toggle ${
                  filteredSubOpt.length === 0 ? "disabled" : ""
                }`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {filteredSubOpt === ""
                  ? "문의할 항목을 선택해주세요"
                  : selSubOpt}
              </button>
              <ul className="dropdown-menu">
                {filteredSubOpt &&
                  filteredSubOpt.map((item) => {
                    return (
                      <li
                        key={uuidv4()}
                        className="dropdown-item"
                        onClick={() => setSelSubOpt(item)}
                      >
                        {item}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-box">
              <input
                className="form-control"
                type="text"
                placeholder="제목을 입력해주세요(50자 내)"
                maxLength="50"
                aria-label="default input example"
                {...register("title")}
              />
            </div>
            <div className="textarea-box">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="10"
                placeholder="내용을 입력해주세요"
                {...register("content")}
              />
            </div>
            <div className="btn-box">
              <input
                className="btn btn-primary"
                type="submit"
                value="등록하기"
              />
            </div>
          </form>
        </div>
      )}
      {activeTab === 1 && (
        <div className="inquiry-list">
          {inquiryData && inquiryData.length > 0
            ? inquiryData.map((item) => {
                return (
                  <Link
                    to={`/inquiryDetail`}
                    style={{ textDecoration: "none" }}
                    key={uuidv4()}
                    state={{ ...state, data: { item } }}
                  >
                    <div className="list-group">
                      <div className="list-group-item list-group-item-action">
                        <span
                          className={`badge ${
                            !item.answer
                              ? "text-bg-secondary"
                              : "text-bg-primary"
                          }`}
                        >
                          {!item.answer ? "응답대기" : "응답완료"}
                        </span>
                        <small>
                          {formatDate(new Date(item.registeredDate))}
                        </small>
                        <div className="inquiry-content">
                          <span className="mb-1">
                            [{optMapping(item.questionCategory)}]
                          </span>
                          {item.title}
                        </div>
                        <i
                          className="fa-solid fa-chevron-right fa-xl"
                          style={{ color: "#303030" }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })
            : !isLoading && (
                <div className="non-list">작성한 문의 내역이 없습니다.</div>
              )}
        </div>
      )}
    </div>
  );
};
export default InquiryPage;
