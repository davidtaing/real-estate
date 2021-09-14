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
  

  // Copy pasted from register.controller.test.js
  // TODO Remove when Login Tests are added
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
  // login success: return 200 status and auth tokens

  // invalid password: return 401 status

  // user doesn't exist: return 401 status

  // invalid body (empty object): return 400 status

  // invalid body (missing email): return 400 status
});