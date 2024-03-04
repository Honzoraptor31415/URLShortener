import { Client, Account } from "appwrite"
import { PUBLIC_APPWRITE_KEY } from "$env/static/public"

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PUBLIC_APPWRITE_KEY)

export const account = new Account(client);
export { ID } from 'appwrite';  