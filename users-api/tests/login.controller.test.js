import chai from "chai";
import chaiHttp from "chai-http";
import fetch from "cross-fetch";

import config from "../src/config/config";
import server from "../src/app";

import { getDefaultUser, WIPE_USERS_URL } from "./config";
import { flushFirebaseUsers, registerDefaultUser } from "./test-utils";

chai.use(chaiHttp);
const { expect } = chai;

/**
 * Before: 
 *     Wipe users database, then create user using default user in config 
 * Tests:
 *     - Successful Login (Valid Credentials)
 *     - Invalid Password
 *     - User Doesn't Exist
 *     - Invalid Body (Empty Object)
 *     - Invalid Body (Missing Email)
 * After:
 *     Wipe users database
 */
describe("Testing User Login", function () {
  before(async () => {
    await flushFirebaseUsers();
    await registerDefaultUser();
  });

  beforeEach(() => {
    this.user = getDefaultUser();
  });

  after(async () => {
    await flushFirebaseUsers();
  });
  
  // login success: return 200 status and auth tokens
  describe("Successful Login", () => {
    it("Valid User Credentials", (done) => {
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
      });
    });
  });

  describe("Failed Login", () => {
    // invalid password: return 401 status
    it("Invalid User Credentials: respond with 401 status", (done) => {
      this.user.password += "asdf";

      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
      });
    });

    // user doesn't exist: return 401 status
    it("Email Not in Database: respond with 401 status", (done) => {
      this.user.email = "asdf" + this.user.email;

      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
      });
    });

    // invalid body (missing email): return 400 status

    // Null User Object
    it("Null User Object: respond with 400 status.", (done) => {
      this.user = null;
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    
    // invalid body (empty object): return 400 status
    it("Empty User Object: respond with 400 status.", (done) => {
      this.user = {};
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });
  });
});