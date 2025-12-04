import express from "express";
import {stkPush} from "../controllers/lipaNaMpesaController.js";
import {auth} from "../middleware/auth.js";
import {ngrokURL} from "../middleware/ngrokURL.js";

const router = express.Router();

router.post("/lipaNaMpesa", auth, ngrokURL, stkPush);


export {router as lipaNaMpesa}