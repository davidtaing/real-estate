import { getAuth, connectAuthEmulator } from "firebase/auth";

const auth = getAuth();
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export default auth;