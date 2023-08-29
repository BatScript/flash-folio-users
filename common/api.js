import { postDataAuth } from "./httpHandler"

export const savePortFolio = async(data) => {
    try {
        const res  = await postDataAuth("/portfolio/savePortfolio", data);
        return res;
    } catch (error) {
        console.error(error);
    }
}