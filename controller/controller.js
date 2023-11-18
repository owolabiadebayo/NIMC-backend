import Data from "../model/data.js";
import axios from "axios";
import sendEmail from "../utils/sendEmail.js";

export const getData = async (req, res) => {
  console.log(req.body.vNIN);
  const vNIN = req.body.vNIN;

  let data = JSON.stringify({
    token: "305d46ca31321acf07cfdb964e91f16b96af409643de952413eb679317ada94e",
    verify: {
      email: "artademi@gmail.com",
      firstname: "Jude",
      lastname: "Okoye",
      phone: "08131111111",
      idno: vNIN,
      idtype: "VNIN",
      reference: "BC534527756685UZZ",
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://geosoft-nimc-portal-backend.onrender.com/api/verification",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.status);
        console.log(error.response.headers);

        // Display the error message to the user
        const errorMessage =
          error.response.data.message || "An unknown error occurred.";
        res.json({ error: errorMessage });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in Node.js
        console.log(error.request);
        res.json({ error: "Could not connect to the server." });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        res.json({ error: error.message });
      }
    });
};
export const addData = async (req, res) => {
  const {
    Selected,
    Family,
    Address1,
    Address2,
    Landmark,
    Names,
    Imagedata,
    Email,
    Application_nos,
  } = req.body;

  const data = new Data({
    Application_nos,
    Family,
    Address1,
    Address2,
    Landmark,
    Names,
    Imagedata,
    Email,
    Selected,
  });

  await data.save();
  const message = `<table>
    <tbody>
        <tr>
            <td style="padding:20px 30px 40px 30px;" bgcolor="#f9f9f9">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td style="padding:5px 0 20px 10px;">
                                <strong>
                                    <p>Hello ${req.body.Names},</p>
                                </strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`;
  await sendEmail(
    req.body.Email,
    `Certificate of indegene for ${process.env.LOCALGOVT}`,
    message
  );

  await sendEmail(
    "owolabiyemisi10@gmail.com",
    `Certificate of indegene for ${process.env.LOCALGOVT}`,
    message
  );
  res.status(200).json({ message: "Data saved successfully" });
};
