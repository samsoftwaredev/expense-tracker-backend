import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

class Database {
  private firebaseConfig: FirebaseOptions;
  private app: FirebaseApp;
  private dbRef;

  constructor() {
    this.firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.API_ID,
      // The value of `databaseURL` depends on the location of the database
      databaseURL: process.env.DATABASE_URL,
    };
    this.app = initializeApp(this.firebaseConfig);
    this.dbRef = getDatabase(this.app);
  }

  ref = () => this.dbRef;
}

const database: Database = new Database();
export { database };
