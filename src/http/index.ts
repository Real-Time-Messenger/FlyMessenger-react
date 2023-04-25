import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";

/**
 * The API URL is set in the .env file.
 */
export const API_URL = import.meta.env.VITE_API_URL;

/**
 * {@link KyInstance} instance for the API.
 */
export const $api: KyInstance = ky.create({
    prefixUrl: API_URL,
    credentials: "include",
    headers: {
        "X-Client-Name": "Fly Messenger",
        "X-Client-Type": "web",
        "X-Client-Version": import.meta.env.VITE_APP_VERSION,
    },
});
