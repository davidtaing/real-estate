import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";

import { getDefaultUser } from "./config";
import { flushFirebaseUsers } from "./test-utils";

chai.use(chaiHttp);
const { expect } = chai;

/**
 * Before: 
 *     - Flush Users From Database
 * Tests:
 *     - Succesfully Register User
 *     - Reregister Same User with Same Credentials
 *     - Invalid Email String
 *     - Garbled Email & Password Strings
 *     - Garbled Email String
 *     - Empty Email & Password Strings
 *     - Empty Email String
 *     - Empty Password String
 *     - User Object is Null
 *     - User Object is Empty
 * After: 
 *     - Flush Users From Database
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
    // await flushFirebaseUsers();
  });

  describe("Successful User Registration", () => {
    it("Successfully Register User: Get 204 Status", (done) => {
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
    it("Register Same User Again: Get 204 Status", (done) => {
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });

    it("Malformed Email String: Get 400 Status", (done) => {
      // Set invalid email. Should be something like "@email@email.com"
      this.user.email = "@" + this.user.email;
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("Garbled Email And Password String: Get 400 Status", (done) => {
      this.user = {
        email: "werihuoaweiuhawe",
        password: "serfoijweroijeram;oisfr",
      };
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("Garbled Email String: Get 400 Status", (done) => {
      this.user.email = "werihuoaweiuhawe";
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });
  
    it("Empty Email & Password Strings: Get 400 Status.", (done) => {
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

    it("Empty Email String: Get 400 Status", (done) => {
      this.user.email = "";
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("Empty Password String: Get 400 Status", (done) => {
      this.user.password = "";
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    it("User Object is Null: Get 400 Status", (done) => {
      this.user = null;
  
      chai.request(server)
        .post("/register")
        .send(this.user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
       });
    });

    // TODO
    it("User Object is Empty Object")
  });
})