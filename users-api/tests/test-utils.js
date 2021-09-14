import fetch from "cross-fetch";
import { WIPE_USERS_URL } from "./config";

export const flushFirebaseUsers = async () => {
  try {
    console.log("Reset test database: deleting all users.");

    const result = await fetch(WIPE_USERS_URL, {
      method: "DELETE",
    });
    console.log("Sucessfully reset test users database.");
    
    return result;
  } catch (err) {
    console.log("Failed to reset test users database.");
    console.error(err);
  }
};