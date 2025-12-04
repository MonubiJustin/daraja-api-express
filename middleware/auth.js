import axios from "axios";

export const auth = async (req, res, next) => {
    try{
            const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
            const consumerKey = process.env.CONSUMER_KEY;
            const consumerSecret = process.env.CONSUMER_SECRET;
            const encoded_string = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

            const {data} = await axios.get(url, {
                headers: {
                    Authorization: `Basic ${encoded_string}`
                }
            });

            req.token = data.access_token;
            next()
    } catch (e) {
        console.error("AUTH ERROR: ", e);
        res.status(500).json({
            success: false,
            message: "Authorization Failed!"
        })
    }
}