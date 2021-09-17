import chai from "chai";
import chaiHttp from "chai-http";
import nock from "nock";

import server from "../src/app";

import { getDefaultEmail, flushFirebaseUsers, registerDefaultUser, getOOBCodes } from "./helpers";

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
    this.payload = { email: getDefaultEmail() };
  });

  after(async () => {
    await flushFirebaseUsers();
  });
  
  describe("Successful Password Change", () => {
    it("Should Have No OOB Codes Before Password Change Request", async () => {
      let oobCodes = await getOOBCodes();
      expect(oobCodes).to.be.an('array');
      expect(oobCodes).to.be.empty;

      return null;
    });
    
    it("Successfully Change Password: Get 204 Status", (done) => {
      chai.request(server)
        .post("/reset-password")
        .send(this.payload)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
      });
    });

    it("Nock Successfully Change Password: Get 204 Status", (done) => {
      const scope = nock("https://localhost:3000")
        .post("/reset-password")
        .reply(204, null);

      scope.done()
    });

    it("Should Have A New OOB Code", async () => {
      let oobCodes =  await getOOBCodes();
      expect(oobCodes).to.be.an('array');
      expect(oobCodes).to.be.lengthOf(1);
      return null;
    });
  });

  describe("Unsuccesful Password Changes", () => {
    it("User Not In Database: Get 204 Status", (done) => {
      this.payload.email = 'asdf' + this.payload.email;
      
      chai.request(server)
        .post("/reset-password")
        .send(this.payload)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
      });
    });

    it("Malformed Email String: Get 400 Status", (done) => {
      // Set invalid email. Should be something like "@email@email.com"
      this.payload.email = '@' + this.payload.email;

      chai.request(server)
        .post("/reset-password")
        .send(this.payload)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
      });
    });
  });
});