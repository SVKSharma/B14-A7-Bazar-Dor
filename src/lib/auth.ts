import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  account: {
    accountLinking: {
      disableImplicitLinking: true,
    },
  },
  socialProviders: { 
    google: { 
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string, 
    },
    github: { 
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string, 
    }, 
  }, 
});