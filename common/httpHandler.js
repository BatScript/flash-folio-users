import axios from "axios";

const baseAxios = axios.create({
  baseURL: "https://api.flashweb.in",
});
export const postDataAuth = async (url, data) => {
  try {
    const res = await baseAxios.post(url, data);
    return res;
  } catch (error) {
    console.error("post error", error);
    return false;
  }
};
