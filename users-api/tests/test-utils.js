import fetch from "cross-fetch";
import chai from "chai";
import chaiHttp from "chai-http";

import { WIPE_USERS_URL, getDefaultUser } from "./config";
import server from "../src/app";

chai.use(chaiHttp);

export const flushFirebaseUsers = async () => {
  try {
    return await fetch(WIPE_USERS_URL, {
      method: "DELETE",
    });
  } catch (err) {
    console.log("Failed to reset test users database.");
    console.error(err);
  }
};

export const registerDefaultUser = async () => {
  try {
    console.log("Registering Default User.");
    chai.request(server)
      .post("/register")
      .send(getDefaultUser());
  } catch (err) {
    console.log("Failed to reset test users database.");
    console.error(err);
  }
}