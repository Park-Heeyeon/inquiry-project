// 날짜 포맷 함수
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷
  const day = String(date.getDate()).padStart(2, "0"); // 일자를 두 자리로 포맷

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = daysOfWeek[date.getDay()]; // 현재 요일을 가져옴

  const formattedDate = `${year}-${month}-${day}(${dayOfWeek})`;
  return formattedDate;
};

// 이메일 유효성 검증 함수
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
