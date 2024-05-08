import Data from "../model/data.js";

export const fetchCert = async (req, res) => {
  try {
    let users = await Data.find().select(
      "_id Application_nos Names date Imagedata Address1 Gender Phonenos Selected"
    );
    // Sending the fetched users as a response
    return res.status(200).json({ users });
  } catch {
    return res.status(403).json({ msg: "Error in Fetching Users" });
  }
};
