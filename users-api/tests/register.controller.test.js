import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";

import { getDefaultUser } from "./config";
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
    this.user = getDefaultUser();
  });

  after(async () => {
    await flushFirebaseUsers();
  });

  describe("Successful User Registration", () => {
    it("Register User: successfully register new user and respond with 204 status code.", (done) => {
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  describe("Failed User Registration", () => {
    it("Register Same User Again: handle auth/email-already-in-use error appropiately and respond with 204 status.", (done) => {
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });

    // Set Invalid Email
    it("Invalid Email Input: respond with 400 status.", (done) => {
      this.user.email = "@" + this.user.email;
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });
  
    // Invalid user object
    it("Empty User Object: respond with 400 status.", (done) => {
      this.user = {
        email: "",
        password: "",
      };
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    // Null user object
    it("Null User Object: respond with 400 status.", (done) => {
      this.user = null;
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });
  });
})