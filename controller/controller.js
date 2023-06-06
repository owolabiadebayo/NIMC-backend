import Data from "../model/model.js";
import fetch from "node-fetch";

export const getData = async (req, res) => {
  console.log(req.body);
  const agentID = "MQSSKY-4549";
  const RPShortCode = "119887";
  const vNIN = req.body.vNIN;
  const apiKey = "dgmP5YTlXyYy7SGGzjJKL5nj3f&Le%Pmxxnh&nbn";

  try {
    const response = await fetch(
      "https://tk.nimc.gov.ng/api/v1/apiVerification/enterprise/direct/vNIN",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Origin": "localhost:3000",
        },
        body: JSON.stringify({
          agentID,
          RPShortCode,
          vNIN,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => res.json(result));
    // .catch(error => console.log('error', error));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
};
export const addData = async (req, res) => {
  const {
    name,
    newName,
    affidavit,
    publication,
    persons,
    referral,
    transactionId,
  } = req.body;

  const data = new Data({
    name,
    newName,
    affidavit,
    publication,
    persons,
    referral,
    transactionId,
  });

  await data.save();

  // Set CORS headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  res.status(200).json({ message: "Data saved successfully" });
};

export const getAllData = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = await Data.find();
  res.status(200).json(data);
};
