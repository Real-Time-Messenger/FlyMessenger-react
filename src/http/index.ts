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
    // throwHttpErrors: false,
    // hooks: {
    //     afterResponse: [
    //         async (_input, _options, response) => {
    //             if (response.ok) return;
    //
    //             const error = await response.json();
    //
    //             const isValidationError = error.details && error.code === 422 || false;
    //             const isApiError = error.code && error.message || false;
    //
    //             // return json if error is validation error
    //             if (isValidationError) {
    //                 return error;
    //             }
    //
    //             // return error if error is api error
    //             if (isApiError) {
    //                 return error.message
    //             }
    //         },
    //     ],
    // },
});
