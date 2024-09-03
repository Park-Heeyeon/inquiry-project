import { useForm } from "react-hook-form";
import {
  saveUserInfo,
  showModal,
  startLoading,
  stopLoading,
} from "../common/redux";
import ConfirmPopup from "./popup/ConfirmPopup";
import { getAllUserEmail, postUserEmail } from "../common/axios";
import { validateEmail } from "../common";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    const email = formData["email"];

    if (email === "") {
      showModal(ConfirmPopup, { content: "이메일을 입력해주세요." });
      return;
    }
    if (!validateEmail(email)) {
      showModal(ConfirmPopup, { content: "유효하지 않은 이메일 주소입니다." });
      return;
    }

    startLoading();
    getAllUserEmail()
      .then((res) => {
        const { data } = res;
        // 등록된 이메일 중에 사용자가 등록한 이메일이 있는지 확인
        const checkEmail = data.find((item) => item.email === email);
        // 중복된 이메일이 있을 경우, 해당 이메일의 문의페이지로 접근
        if (checkEmail) {
          saveUserInfo(checkEmail.email);
          showModal(ConfirmPopup, {
            content:
              "등록된 이메일이 있습니다.<br/>해당 이메일의 문의페이지로 이동합니다.",
            // 팝업의 확인버튼을 클릭했을때 실행
            onConfirm: () => {
              navigate(`/InquiryPage`);
            },
          });
        }
        // 중복된 이메일이 없을 경우, 이메일 등록 후 등록한 이메일 페이지로 접근
        else {
          postUserEmail(formData)
            .then((res) => {
              // 이메일 등록 후 발급 받은 id를 이용해 URL 접근
              const { email } = res.data;
              saveUserInfo(email);
              showModal(ConfirmPopup, {
                content: "이메일이 정상적으로 등록되었습니다.",
                onConfirm: () => {
                  navigate(`/InquiryPage`);
                },
              });
            })
            .catch((error) => {
              console.log("희연 error", error);
              showModal(ConfirmPopup, {
                content: "이메일 등록에 실패했습니다.",
              });
              reset();
            });
        }
      })
      .catch((error) => {
        console.log("희연 error", error);
        showModal(ConfirmPopup, {
          content: "이메일 등록에 실패했습니다.",
        });
      })
      .finally(() => stopLoading());
  };

  return (
    <div className="login-page">
      <div className="form-box">
        <div className="title-box">1:1문의하기</div>
        <p className="fs-6">
          안녕하세요.
          <br />
          1:1문의하기를 이용하시려면 이메일 등록을 해주세요.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              {...register("email")}
            />
            <label value="floatingInput">Email address</label>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
