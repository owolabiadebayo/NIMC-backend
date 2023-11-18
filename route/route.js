import express from "express";
import { getData, addData } from "../controller/controller.js";
import { fetchCert } from "../controller/Certificate.js";
const router = express.Router();

router.post("/adddata", addData);
// router.get('/getalldata', getAllData);
router.post("/fetchdata", getData);
router.get("/fetchcert", fetchCert);

export default router;
