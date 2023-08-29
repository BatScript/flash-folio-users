import axios from "axios";

const baseAxios = axios.create({
  baseURL: "https://api.flashweb.in",
});
export const postDataAuth = async (url, data) => {
  try {
    const res = await baseAxios.post(url, data);
    return res;
  } catch (error) {
    console.error("post error", error.message);
    return error;
  }
};

export const getDataAuth = async(url) => {
  try {
    const res = await baseAxios.get(url);
    return res;
  } catch (error) {
    return error;
  }
}
