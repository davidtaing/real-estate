import fetch from "cross-fetch";
import { WIPE_USERS_URL } from "./config";

export const flushFirebaseUsers = async () => {
  try {
    return await fetch(WIPE_USERS_URL, {
      method: "DELETE",
    });
  } catch (err) {
    console.log("Failed to reset test users database.");
    console.error(err);
  }
};