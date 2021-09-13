import chai from "chai";
import chaiHttp from "chai-http";
import fetch from "cross-fetch";

import config from "../src/config/config";
import server from "../src/app";

import { DEFAULT_TEST_USER, WIPE_USERS_URL } from "./config";

chai.use(chaiHttp);
const { expect } = chai;

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

  it("Register User: successfully register new user and respond with 204 status code.", async () => {
    chai.request(server)
      .post("/register")
      .send(DEFAULT_TEST_USER)
      .end((err, res) => {
        expect(res).to.have.status(204);
      });
  });

  it("Register Same User Again: handle auth/email-already-in-use error appropiately and respond with 204 status.", async () => {
    chai.request(server)
      .post("/register")
      .send(DEFAULT_TEST_USER)
      .end((err, res) => {
         expect(res).to.have.status(204);
      });
  });

  it("Invalid Email Input: respond with 400 status.", () => {
    let user = {
      // Create invalid email string
      email: '@' + DEFAULT_TEST_USER.email,
      password: DEFAULT_TEST_USER.password,
    };

    chai.request(server)
      .post("/register")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
     });
  });

  it("Empty User Object: respond with 400 status.", () => {
    // Invalid user object
    let user = {
      email: "",
      password: "",
    };

    chai.request(server)
      .post("/register")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
     });
  });
})