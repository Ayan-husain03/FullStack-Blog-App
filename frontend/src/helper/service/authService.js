import api from "../api/api";

export const getCurrentUser = async () => {
  const res = await api.get("/user/me");
  console.log(res)
  return res.data;
};
