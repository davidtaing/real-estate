import config from "../src/config/config";

const { projectId : FIREBASE_PROJECT_ID } = config.FIREBASE_CONFIGS;

// DELETE URL: Removes all user accounts in emulator database.
// NOTE: Only works for emulator and not production database.
export const FLUSH_USERS_URL = `http://localhost:9099/emulator/v1/projects/${FIREBASE_PROJECT_ID}/accounts`;

// GET URL: Retrieve out-of-band authentication codes.
export const OOB_CODES_URL = `http://localhost:9099/emulator/v1/projects/${FIREBASE_PROJECT_ID}/oobCodes`;

export const getDefaultUser = () => ({
  email: getDefaultEmail(),
  password: getDefaultPassword(),
});

export const getDefaultEmail = () => ("hello@fakewebsite.com");

export const getDefaultPassword = () => ("12345678");