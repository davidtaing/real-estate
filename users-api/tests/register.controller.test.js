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
describe("Testing User Registration", function () {
  // Clear user accounts before and after running tests
  before(async () => {
    await flushFirebaseUsers();
  });

  beforeEach(() => {
    this.user = DEFAULT_TEST_USER();
  });

  after(async () => {
    await flushFirebaseUsers();
  });

  describe("Successful User Registration", () => {
    it("Register User: successfully register new user and respond with 204 status code.", async () => {
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(204);
        });
    });
  });

  describe("Failed User Registration", () => {
    it("Register Same User Again: handle auth/email-already-in-use error appropiately and respond with 204 status.", async () => {
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(204);
        });
    });
  
    it("Invalid Email Input: respond with 400 status.", () => {
      this.user = {
        // Create invalid email string
        email: '@' + this.user.email,
        password: this.user.password,
      };
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
       });
    });
  
    it("Empty User Object: respond with 400 status.", () => {
      // Invalid user object
      this.user = {
        email: "",
        password: "",
      };
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
       });
    });
  });
})