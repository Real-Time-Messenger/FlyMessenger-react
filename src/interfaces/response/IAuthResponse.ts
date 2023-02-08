/**
 * Interface for the Authentication Success Response.
 */
export interface IAuthResponse {
	token?: string;
	event?: AuthResponseEvent;
}

/**
 * Enum for Authentication Response Events.
 */
export enum AuthResponseEvent {
	TWO_FACTOR = "TWO_FACTOR",
	NEW_DEVICE = "NEW_DEVICE",
}
