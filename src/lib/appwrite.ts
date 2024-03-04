import { Client } from "appwrite"

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.PUBLIC_APPWRITE_KEY);