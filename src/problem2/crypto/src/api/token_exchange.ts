import CryptoConvert from "crypto-convert";
import { token } from "../components/types/token";

const convert = new CryptoConvert({ coinbase: true });

export const getCryptoPrice = async (from: token, to: token, amount: number) => {
    await convert.ready();
    return convert[from][to](amount);
};
