import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";

import { DEFAULT_TEST_USER } from "./config";
import { flushFirebaseUsers } from "./test-utils";

chai.use(chaiHttp);
const { expect } = chai;

/**
 * Before: Wipe users database
 * Tests:
 *     - Succesfully register user
 *     - Reregister same user with same credentials as previous test
 *     - Invalid email
 *     - Empty user object
 * Before: Wipe users database again
 */
describe("Testing User Registration", () => {
  // Clear user accounts before and after running tests
  before(async () => {
    await flushFirebaseUsers();
  });

  after(async () => {
    await flushFirebaseUsers();
  });

  describe("Successful User Registration", () => {
    it("Register User: successfully register new user and respond with 204 status code.", async () => {
      chai.request(server)
        .post("/register")
        .send(DEFAULT_TEST_USER)
        .end((err, res) => {
          expect(res).to.have.status(204);
        });
    });
  });

  describe("Failed User Registration", () => {
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
  });
})