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
 *     - Flush Users From Database, 
 *     - Create Default User
 * Tests:
 *     - Successful Login (Valid Credentials)
 *     - Invalid Password
 *     - User Doesn't Exist
 *     - Malformed Email String
 *     - Garbled Email & Password Strings
 *     - Empty Email & Password Strings
 *     - Empty Email String
 *     - Empty Password String
 *     - User is a null object
 *     - User is an empty object
 * After:
 *     Flush Users From Database
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
    it("Invalid Password: respond with 401 status", (done) => {
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

    it("Malformed Email Address: respond with 401 status.", (done) => {
      // Set invalid email. Should be something like "@email@email.com"
      this.user.email = "@" + this.user.email;
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
       });
    });

    it("Garbled Email & Password Strings: respond with 401 status.", (done) => {
      this.user = {
        email: "werihuoaweiuhawe",
        password: "serfoijweroijeram;oisfr",
      };
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
       });
    });

    it("Empty Email & Password Strings: respond with 400 status.", (done) => {
      this.user = {
        email: "",
        password: "",
      };
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("Empty Email String: respond with 400 status.", (done) => {
      this.user.email = "";
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("Empty Password String: respond with 400 status.", (done) => {
      this.user.password = "";
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

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