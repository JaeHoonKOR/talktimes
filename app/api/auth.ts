// 백엔드 API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// 회원가입 API
export async function signup(email: string, password: string, name?: string) {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    return {
      success: response.status === 201,
      ...data
    };
  } catch (error) {
    console.error('회원가입 API 오류:', error);
    return { 
      success: false, 
      message: '서버와 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요.' 
    };
  }
}

// 로그인 API
export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('로그인 API 오류:', error);
    return { 
      success: false, 
      message: '서버와 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요.' 
    };
  }
} 