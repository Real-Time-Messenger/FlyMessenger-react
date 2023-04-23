/**
 * Details model for validation error.
 *
 * @interface ResponseErrorDetails
 *
 * @property {string} location - The location of the error.
 * @property {string} field - The field of the error.
 * @property {string} message - The message of the error.
 * @property {string | null} translation - The translation of the error.
 */
interface ResponseErrorDetails {
    location: string;
    field: string;
    message: string;
    translation: string | null;
}

/**
 * Interface for validation error response.
 *
 * @interface IResponseValidationError
 *
 * @property {ResponseErrorDetails[]} details - The details of the error.
 * @property {number} code - The error code.
 */
export interface IResponseValidationError {
    details: ResponseErrorDetails[];
    code: number;
}
