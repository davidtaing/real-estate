import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";

import { getDefaultUser } from "./config";
import { flushFirebaseUsers, registerDefaultUser } from "./test-utils";

chai.use(chaiHttp);
const { expect } = chai;


/**
 * Before:
 *     - Flush Users From Database
 *     - Register Default User
 *     - Test Default User Credentials
 * Tests:
 *     - Successfully Change Password
 *     - Malformed Email Address (Invalid Email Address)
 *     - User Not In Database
 * After:
 *     - Flush Users From Database
 */
describe("Testing Password Change", function () {
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
  
  describe("Successful Password Change", () => {
    it("Successfully Change Password: Get 204 Status", (done) => {
      chai.request(server)
        .post("/reset-password")
        .send(this.user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
      });
    });
  });

  describe("Unsuccesful Password Changes", () => {
    it("User Not In Database: Get 204 Status", (done) => {
      this.user.email = 'asdf' + this.user.email;
      
      chai.request(server)
        .post("/reset-password")
        .send(this.user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
      });
    });

    it("Malformed Email String: Get 400 Status", (done) => {
      // Set invalid email. Should be something like "@email@email.com"
      this.user.email = '@' + this.user.email;

      chai.request(server)
        .post("/reset-password")
        .send(this.user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
      });
    });
  });

});