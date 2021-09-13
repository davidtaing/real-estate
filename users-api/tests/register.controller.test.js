import chai from "chai";
import chaiHttp from "chai-http";
import fetch from "cross-fetch";

import config from "../src/config/config";
import server from "../src/app";

chai.use(chaiHttp);
const { expect } = chai;

const DEFAULT_TEST_USER = {
  email: "hello@fakewebsite.com",
  password: "12345678",
}

const { projectId : FIREBASE_PROJECT_ID } = config.FIREBASE_CONFIGS;

// DELETE URL: Removes all user accounts in emulator database.
// NOTE: Only works for emulator and not production database.
const WIPE_USERS_URL = `http://localhost:9099/emulator/v1/projects/${FIREBASE_PROJECT_ID}/accounts`

/**
 * TODO: Test Flow
 * Source: https://firebase.google.com/docs/emulator-suite/connect_auth
 * 
 * 1. Create Users with Authentication signUp REST Endpoint
 * 2. Sign in users using the emails and passwords to perform tests.
 * 3. If applicable to your tests, fetch available out-of-band email verification codes from the emulator-specific REST endpont.
 * 4. Flush user records with the emulator-specific REST endpoint for clearing data.
 */

describe("User Registration", () => {
  // Clear user accounts before running tests
  before(async () => {
    try {
      console.log("Reset test database: deleting all users.");

      await fetch(WIPE_USERS_URL, {
        method: "DELETE",
      })

      console.log("Sucessfully reset test users database.");
    } catch (err) {
      console.log("Failed to reset test users database.");
      console.error(err);
    }
  });

  it("Should Register User and Return a 200 Status Code", async () => {
    chai.request(server)
      .post("/register")
      .send(DEFAULT_TEST_USER)
      .end((err, res) => {
         expect(res).to.have.status(204);
      });
  })
})