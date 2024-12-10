const express = require("express");
const { getData, addData } = require("../controller/controller.js");
const { fetchCert } = require("../controller/Certificate.js");
const router = express.Router();

router.post("/adddata", addData);
// router.get('/getalldata', getAllData);
router.post("/fetchdata", getData);
router.get("/fetchcert", fetchCert);

module.exports = router;
