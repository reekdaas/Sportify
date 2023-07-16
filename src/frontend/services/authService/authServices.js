import axios from "axios";

export const logInService = async (userData) =>
  await axios.post(`/api/auth/login`, userData);

export const signInService = async (userData) =>
  await axios.post("/api/auth/signup", userData);
