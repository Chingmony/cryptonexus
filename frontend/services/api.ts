// services/api.ts
import axios from "axios";

const API_BASE = "http://localhost:8000/toolkit"; // replace with your FastAPI URL

// ---------- Hashing ----------
// ---------- Hashing (UPLOAD) ----------
export const hashFile = async (file: File) => {
  const form = new FormData();
  form.append("file", file);

  const { data } = await axios.post(
    `${API_BASE}/hash-file`,
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data;
};

export const verifyIntegrity = async (file1: File, file2: File) => {
  const form = new FormData();
  form.append("file1", file1);
  form.append("file2", file2);

  const { data } = await axios.post(
    `${API_BASE}/verify-integrity`,
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data;
};

// ---------- AES ----------
export const aesEncrypt = async (message: string) => {
  const { data } = await axios.post(`${API_BASE}/aes/encrypt`, { message });
  return data;
};

export const aesDecrypt = async (key: string, nonce: string, ciphertext: string) => {
  const { data } = await axios.post(`${API_BASE}/aes/decrypt`, { key, nonce, ciphertext });
  return data;
};

// ---------- RSA ----------
export const rsaEncrypt = async (message: string) => {
  const { data } = await axios.post(`${API_BASE}/rsa/encrypt`, { message });
  return data;
};

export const rsaDecrypt = async (key: string, ciphertext: string) => {
  const { data } = await axios.post(`${API_BASE}/rsa/decrypt`, { key, ciphertext });
  return data;
};

// ---------- Password ----------
export const checkPasswordStrength = async (password: string) => {
  const { data } = await axios.post(`${API_BASE}/password/strength`, { password });
  return data;
};



export const hashPassword = async (password: string) => {
  const { data } = await axios.post(`${API_BASE}/password/hash`, { password });
  return data;
};

export const verifyPassword = async (password: string, hashed_password: string) => {
  const { data } = await axios.post(`${API_BASE}/password/verify`, { password, hashed_password });
  return data;
};
