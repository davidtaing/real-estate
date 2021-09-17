import fetch from "cross-fetch";
import chai from "chai";
import chaiHttp from "chai-http";

import server from "../src/app";
import config from "../src/config/config";

const { projectId : FIREBASE_PROJECT_ID } = config.FIREBASE_CONFIGS;

chai.use(chaiHttp);

// DELETE URL: Removes all user accounts in emulator database.
// NOTE: Only works for emulator and not production database.
export const FLUSH_USERS_URL = `http://localhost:9099/emulator/v1/projects/${FIREBASE_PROJECT_ID}/accounts`;

// GET URL: Retrieve out-of-band authentication codes.
export const OOB_CODES_URL = `http://localhost:9099/emulator/v1/projects/${FIREBASE_PROJECT_ID}/oobCodes`;

export const getDefaultUser = () => ({
  email: getDefaultEmail(),
  password: getDefaultPassword(),
});

export const getDefaultEmail = () => ("hello@fakewebsite.com");

export const getDefaultPassword = () => ("12345678");

export const flushFirebaseUsers = async () => {
  try {
    return await fetch(FLUSH_USERS_URL, {
      method: "DELETE",
    });
  } catch (err) {
    console.log("Failed to reset test users database.");
    console.error(err);
  }
};

export const registerDefaultUser = async () => {
  try {
    chai.request(server)
      .post("/register")
      .send(getDefaultUser());
  } catch (err) {
    console.log("Failed to register default user.");
    console.error(err);
  }
}

export const getOOBCodes = async () => {
  try {
    const response = await fetch(OOB_CODES_URL, {
      method: "GET",
    });

    const { oobCodes } = await response.json();
    return oobCodes;
  } catch (err) {
    console.log("Failed to reset test users database.");
    console.error(err);
  }
}