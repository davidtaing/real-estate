import { initializeApp } from "firebase/app";
import config from "../config/config";

const { FIREBASE_CONFIGS } = config;

const app = initializeApp(FIREBASE_CONFIGS);

export default app;