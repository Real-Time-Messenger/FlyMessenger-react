/**
 * Authentication Response.
 *
 * @interface IAuthResponse
 *
 * @property {string | undefined} token - The authentication token.
 * @property {AuthResponseEvent | undefined} event - The authentication event.
 */
export interface IAuthResponse {
    token?: string;
    event?: AuthResponseEvent;
}

/**
 * Event types for the authentication response.
 */
type AuthResponseEvent = "TWO_FACTOR" | "NEW_DEVICE";
