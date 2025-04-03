import {jwtDecode} from 'jwt-decode';

export function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // en segundos

    return decoded.exp > currentTime;
  } catch (error) {
    return false; // token inválido
  }
}