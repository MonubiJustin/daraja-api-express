import axios from "axios";
import {getTimestamp} from "../utils/timestamp.js";
import dotenv from "dotenv";
import {queryCallback} from "../utils/queryCallback.js";
import {getPassword} from "../utils/getPassword.js";

dotenv.config();

export const stkPush = async (req, res) => {
    try{
        const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

        // get the phone
        const number = req.body.phoneNumber.replace(/0/, "");
        const phoneNumber = `254${number}`;

        // get the timestamp
        const timestamp = getTimestamp();

        // password
        const password = getPassword();

        // get domain
        const domain = req.domain;

        // get token
        const token = req.token;

        const payload = {
            BusinessShortCode: process.env.BUSINESS_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: process.env.TRANSACTION_TYPE,
            Amount: "1",
            PartyA: phoneNumber,
            PartyB: process.env.BUSINESS_SHORTCODE,
            PhoneNumber: phoneNumber,
            CallBackURL: `${domain}/callback`,
            AccountReference: "illuminati",
            TransactionDesc: "pay goods"
        };

        const {data} = await axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log(data);
        console.log("\n");

        const {ResponseCode, CheckoutRequestID} = data;

        if (ResponseCode === '0'){
            const data = await queryCallback(CheckoutRequestID, token);
            if (data){
                const {resultcode, resultdesc} = data;
                if (resultcode === '0'){
                    res.render('success', {
                        type: "successful",
                        heading: "Payment successful"
                    });
                } else{
                    res.render("failed", {
                        type: "failed",
                        heading: "Payment failed",
                        desc: `${resultdesc}.Please try again later`
                    })
                }
            }
        }


    } catch (e) {
        console.error("STK PUSH ERROR: ", e);
        res.status(500).json({
            success: false,
            message: "STK PUSH FAILED"
        })
    }
}
