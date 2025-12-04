import express from "express";
import {callbackHandler} from "../controllers/callbackController.js";

const router = express.Router();

router.post("/callback", callbackHandler);

export {router as callback};