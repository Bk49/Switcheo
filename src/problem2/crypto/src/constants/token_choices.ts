import { DropdownChoices } from "../components/form/SelectCurrencyField";
import ADASvg from "../assets/tokens/ADA.svg";
import BCHSvg from "../assets/tokens/BCH.svg";
import BNBSvg from "../assets/tokens/BNB.svg";
import BTCSvg from "../assets/tokens/BTC.svg";
import DOGESvg from "../assets/tokens/DOGE.svg";
import DOTSvg from "../assets/tokens/DOT.svg";
import ETHSvg from "../assets/tokens/ETH.svg";
import LINKSvg from "../assets/tokens/LINK.svg";
import LTCSvg from "../assets/tokens/LTC.svg";
import USDTSvg from "../assets/tokens/USDT.svg";
import XLMSvg from "../assets/tokens/XLM.svg";
import XRPSvg from "../assets/tokens/XRP.svg";

export const tokenChoices: DropdownChoices[] = [
    { id: 0, value: "", text: "Please Select a currency to begin swapping" },
    { id: 1, value: "ADA", text: "ADA", img: ADASvg },
    { id: 2, value: "BCH", text: "BCH", img: BCHSvg },
    { id: 3, value: "BNB", text: "BNB", img: BNBSvg },
    { id: 4, value: "BTC", text: "BTC", img: BTCSvg },
    { id: 5, value: "DOGE", text: "DOGE", img: DOGESvg },
    { id: 6, value: "DOT", text: "DOT", img: DOTSvg },
    { id: 7, value: "ETH", text: "ETH", img: ETHSvg },
    { id: 8, value: "LINK", text: "LINK", img: LINKSvg },
    { id: 9, value: "LTC", text: "LTC", img: LTCSvg },
    { id: 10, value: "USDT", text: "USDT", img: USDTSvg },
    { id: 11, value: "XLM", text: "XLM", img: XLMSvg },
    { id: 12, value: "XRP", text: "XRP", img: XRPSvg },
];
