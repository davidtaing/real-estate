import chai from "chai";
import chaiHttp from "chai-http";
import fetch from "cross-fetch";

import config from "../src/config/config";
import server from "../src/app";

import { getDefaultUser } from "./config";
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
 *     - Email Not In Database (User Doesn't Exist)
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
    it("Invalid Password: Get 401 Status", (done) => {
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

    it("Email Not in Database: Get 401 Status", (done) => {
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

    it("Malformed Email Address: Get 401 Status", (done) => {
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

    it("Garbled Email & Password Strings: Get 401 Status", (done) => {
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

    it("Empty Email & Password Strings: Get 400 Status", (done) => {
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

    it("Empty Email String: Get 400 Status", (done) => {
      this.user.email = "";
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("Empty Password String: Get 400 Status", (done) => {
      this.user.password = "";
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("User Object is Null: Get 400 Status", (done) => {
      this.user = null;
  
      chai.request(server)
        .post("/login")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("User Object is an Empty Object: Get 400 Status", (done) => {
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