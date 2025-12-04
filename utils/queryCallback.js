import {getPassword} from "./getPassword.js";
import {getTimestamp} from "./timestamp.js";
import axios from "axios";

export const queryCallback = (checkout_id, token) => {

    return new Promise((resolve, reject) => {
        const query_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';

        const payload = {
        BusinessShortCode: process.env.BUSINESS_SHORTCODE,
        Password: getPassword(),
        Timestamp: getTimestamp(),
        CheckoutRequestID: checkout_id
    };

         const timer = setInterval(async () => {

        try{
            const callbackdata = await axios.post(query_url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(callbackdata.data);

            const resultcode = callbackdata.data.ResultCode;
            const resultdesc = callbackdata.data.ResultDesc;

            if (resultcode && resultcode !== '4999'){
                clearInterval(timer);
                resolve({resultcode, resultdesc});

            }

        } catch (e) {
           console.error("ERROR IN STK QUERY: ", e.message);
        }

    }, 5000)
    })

}