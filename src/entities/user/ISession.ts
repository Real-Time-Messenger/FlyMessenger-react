/**
 * Interface for a session model.
 *
 * @interface ISession
 *
 * @property {string} id - The session ID.
 * @property {string} token - The session token.
 * @property {string} ipAddress - The session IP address.
 * @property {"DESKTOP" | "WEB"} type - The session type.
 * @property {string} location - The session location.
 * @property {string} label - The session label.
 * @property {boolean} current - Determines if the session is current.
 * @property {Date} createdAt - The session created date.
 */
export interface ISession {
    id: string;
    token: string;
    ipAddress: string;
    type: "DESKTOP" | "WEB";
    location: string;
    label: string;
    current?: boolean;
    createdAt: Date;
}
