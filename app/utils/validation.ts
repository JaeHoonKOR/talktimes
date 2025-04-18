// 이메일 유효성 검사
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검사
// 최소 8자 이상, 최소 하나의 문자, 하나의 숫자, 하나의 특수문자 포함
export const isValidPassword = (password: string): boolean => {
  if (password.length < 8) return false;
  
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasLetter && hasNumber && hasSpecialChar;
}; 