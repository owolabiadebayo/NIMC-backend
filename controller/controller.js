const Data = require("../model/data");
const axios = require("axios");
const sendEmail = require("../utils/sendEmail");
const qs = require("qs");
const fs = require("fs");
const { execSync } = require("child_process");

const publicKeyPath = "publickey.key";

exports.getData = async (req, res) => {
  console.log(req.body.vNIN);

  let datar = qs.stringify({
    agentID: "MQSSKY-4549",
    vNIN: req.body.vNIN,
    RPShortCode: "119887",
  });
  console.log("data:", datar);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://tk.nimc.gov.ng/api/v1/apiVerification/enterprise/direct/vNIN",
    headers: {
      "x-api-key": "dgmP5YTlXyYy7SGGzjJKL5nj3f&Le%Pmxxnh&nbn",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: datar,
  };

  axios
    .request(config)
    .then(async (response) => {
      const jsonStr = JSON.stringify(response.data);
      const data = JSON.parse(jsonStr);
      console.log(data);
      if (data.data) {
        fs.writeFileSync("publicpayload.b64", data.data);
        const publicPayloadPath = "publicpayload.b64";

        const publicPayload = fs
          .readFileSync(publicPayloadPath)
          .toString()
          .trim();

        //const command = `echo ${publicPayload} | base64 -d | openssl rsautl -decrypt -oaep -inkey ${publicKeyPath}`;

        const command = `echo ${publicPayload} | base64 -d | openssl pkeyutl -decrypt -inkey ${publicKeyPath} -pkeyopt rsa_padding_mode:oaep`;

        let stringDecryptedPayload;
        try {
          stringDecryptedPayload = execSync(command).toString();
          console.log("Decrypted Payload:", stringDecryptedPayload);
        } catch (error) {
          console.error("Error executing command:", error.message);
          return res
            .status(500)
            .json({ message: "Decryption failed", error: error.message });
        }

        let decryptedPayload;
        try {
          decryptedPayload = JSON.parse(stringDecryptedPayload);
        } catch (error) {
          console.error("Error parsing decrypted payload:", error.message);
          return res.status(500).json({
            message: "Decryption result is not valid JSON",
            error: error.message,
          });
        }

        // Assuming decryptedPayload is a JSON object
        const updatedData = {
          ...decryptedPayload,
          photograph: data.photograph,
          // barcode: png.toString("base64"),
        };

        // Remove userid and agentID properties
        const { userid, agentID, ...messageData } = updatedData;

        res.status(200).json({ message: messageData, success: data.success });
      } else {
        res.status(500).json({ message: data.message });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

exports.addData = async (req, res) => {
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
    Phonenos,
    Gender,
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
    Phonenos,
    Gender,
  });

  await data.save();
  const message = `<table>
  <tbody>
      <tr>
          <td style="padding:20px 30px 40px 30px;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tbody>
                      <tr>
                          <td style="padding:5px 0 20px 10px; font-size: 18px; line-height: 24px;">
                              <strong>
                                  <p style="font-size: 20px; line-height: 28px;">Hello ${req.body.Names},</p>
                              </strong>
                              <p style="font-size: 16px; line-height: 24px;">
                                  Congratulation on your effort in applying for the Wase LG Indegene Certificate. To continue the Application Process, do the following
                              </p>
                              <ul style="font-size: 16px; line-height: 24px;">
                                      <li>
                                      Print the Email 
                                  </li>
                                  <li> Download your Clearance form. <i>https://drive.google.com/uc?export=download&id=11BPXgchQe33oadJf3pvrjCm6ZaYCn96H<i> and Proceed to the Emir Mai angwa</li>
                                  <li>
                                      Obtain The attestation letter from the Emir mai angwa
                                  </li>
                                  <li>
                                      Proceed with the signed attestation to the office of chairman Wase Lg for further processing.
                                  </li>
                                  <li>
                                      Wait for an email with your Application number and further download instructions
                                  </li>
                              </ul>
                              <strong style="font-size: 18px; line-height: 28px;">Thank you</strong>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </td>
      </tr>
  </tbody>
</table>`;

  const message2 = `<table>
<tbody>
    <tr>
        <td style="padding:20px 30px 40px 30px;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                    <tr>
                        <td style="padding:5px 0 20px 10px; font-size: 18px; line-height: 24px;">
                            <strong>
                                <p style="font-size: 20px; line-height: 28px;">Dear Chairman Local Govt,</p>
                            </strong>
                            <p style="font-size: 16px; line-height: 24px;">
                                Kindly find the details of the Applicant
                            </p>
                            <ul style="font-size: 16px; line-height: 24px;">
                                <li>
                                    Application Nos -------> ${req.body.Application_nos}
                                </li>
                                <li>
                                    Names ------>${req.body.Names}
                                </li>
                                <li>
                                    Gender ------>${req.body.Gender}
                                </li>
                                <li>
                                    Wards ------->${req.body.Selected}
                                </li>
                                <li>
                                    Email ------->${req.body.Email}
                                </li>
                                <li>
                                    Address -------> ${req.body.Address1}
                                </li>
                                <li>
                                    District -------> ${req.body.Landmark}
                                </li>
                                <li>
                                    Phone Number ------> ${req.body.Phonenos}
                                </li>
                            </ul>
                            <strong style="font-size: 18px; line-height: 28px;">Thank you</strong>
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
    "waselgc.gov.ng@gmail.com",
    `Certificate of indegene for ${process.env.LOCALGOVT}`,
    message2
  );
  res.status(200).json({ message: "Data saved successfully" });
};
