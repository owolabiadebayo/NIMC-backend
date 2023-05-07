import express from "express";
import { getData, getAllData, addData } from "../controller/controller.js";

const router = express.Router();

router.post('/adddata', addData);
router.get('/getalldata', getAllData);
router.post('/fetchdata', getData);

export default router
