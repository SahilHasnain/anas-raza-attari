/**
 * Appwrite Configuration for Next.js
 */

import { AppwriteService } from "./appwrite-service";
import {
    createAppwriteConfig,
    validateAppwriteConfig as validateConfig,
} from "./shared/config";

// Map Next.js environment variables to shared config format
const env = {
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1",
  APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "69907afc003b9e3d9152",
  APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "main-db",
  APPWRITE_NAATS_COLLECTION_ID:
    process.env.NEXT_PUBLIC_APPWRITE_NAATS_COLLECTION_ID || "naats",
  APPWRITE_CHANNELS_COLLECTION_ID:
    process.env.NEXT_PUBLIC_APPWRITE_CHANNELS_COLLECTION_ID || "channels",
  APPWRITE_AUDIO_CACHE_COLLECTION_ID:
    process.env.NEXT_PUBLIC_APPWRITE_AUDIO_CACHE_COLLECTION_ID || "audio-cache",
  AUDIO_EXTRACTION_FUNCTION_URL:
    process.env.NEXT_PUBLIC_AUDIO_EXTRACTION_FUNCTION_URL || "",
  AUDIO_STREAMING_FUNCTION_URL:
    process.env.NEXT_PUBLIC_AUDIO_STREAMING_FUNCTION_URL || "",
  RAPIDAPI_KEY: process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
};

export const appwriteConfig = createAppwriteConfig(env);

/**
 * Validates that all required Appwrite configuration values are present
 * @throws Error if any required configuration is missing
 */
export function validateAppwriteConfig(): void {
  validateConfig(appwriteConfig);
}

/**
 * Singleton instance of AppwriteService for web
 */
export const appwriteService = new AppwriteService({
  config: appwriteConfig,
  onError: (error, context) => {
    // Log errors to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Appwrite error:", error, context);
    }
    // In production, you could send to error tracking service
  },
});

/**
 * Direct Appwrite SDK exports for admin operations
 */
import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const storage = new Storage(client);
