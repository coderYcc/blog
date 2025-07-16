// utils/jwt.js
export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse JWT', e);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;

  const expirationTime = payload.exp * 1000; // exp 是秒级时间戳，要转成毫秒
  return Date.now() > expirationTime;
};