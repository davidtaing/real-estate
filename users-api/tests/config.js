import config from "../src/config/config";

const { projectId : FIREBASE_PROJECT_ID } = config.FIREBASE_CONFIGS;

// DELETE URL: Removes all user accounts in emulator database.
// NOTE: Only works for emulator and not production database.
export const FLUSH_USERS_URL = `http://localhost:9099/emulator/v1/projects/${FIREBASE_PROJECT_ID}/accounts`;

export const getDefaultUser = () => ({
  email: "hello@fakewebsite.com",
  password: "12345678",
});