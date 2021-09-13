import chai from "chai";
import chaiHttp from "chai-http";
import fetch from "cross-fetch";

import config from "../src/config/config";
import server from "../src/app";

import { DEFAULT_TEST_USER, WIPE_USERS_URL } from "./config";

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
describe("Testing User Login", () => {
  // before

  // login success: return 200 status and auth tokens

  // invalid password: return 401 status

  // user doesn't exist: return 401 status

  // invalid body (empty object): return 400 status

  // invalid body (missing email): return 400 status

  // after
});