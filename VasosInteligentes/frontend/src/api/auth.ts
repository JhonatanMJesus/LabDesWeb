import api from "../utils/api";

export const login = async (email: string, senha: string) => {
  const res = await api.post("/login", { email, senha });
  return res.data;
};

export const logout = async () => {
  await api.post("/logout");
};

export const getProfile = async () => {
  const res = await api.get("/me");
  return res.data;
};

export const registerUser = async (userData: {
  nome: string;
  email: string;
  senha: string;
  perfil?: string;
}) => {
  const res = await api.post("/register", userData);
  return res.data;
};
