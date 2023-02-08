/**
 * Details model for validation error.
 */
interface ResponseErrorDetails {
	location: string;
	field: string;
	message: string;
	translation: string | null;
}

/**
 * Base interface for the `ResponseValidationError` model.
 */
export interface IResponseValidationError {
	details: ResponseErrorDetails[];
	code: number;
}
