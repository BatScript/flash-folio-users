import { getDataAuth, postDataAuth } from "./httpHandler";

export const savePortFolio = async (data) => {
  try {
    const res = await postDataAuth("/portfolio/savePortfolio", data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getPortfolioByEmail = async (email) => {
  try {
    const res = await getDataAuth(`/portfolio/getPortfolio?email=${email}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
