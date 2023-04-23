/**
 * Interface for API error response.
 *
 * @interface IAPIError
 *
 * @property {number} code - The error code.
 * @property {string} message - The error message.
 * @property {string} translation - The error message translation key.
 */
export interface IAPIError {
    code: number;
    message: string;
    translation?: string;
}
