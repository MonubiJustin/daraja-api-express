import {getTimestamp} from "./timestamp.js";

export const getPassword = () => {
    const timestamp = getTimestamp();
    const shortcode = process.env.BUSINESS_SHORTCODE;
    const passkey = process.env.PASSKEY;

    return Buffer.from(shortcode+passkey+timestamp).toString("base64")
}