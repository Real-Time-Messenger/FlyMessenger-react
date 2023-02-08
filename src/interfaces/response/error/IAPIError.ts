/**
 * Base interface for the `APIError` model.
 */
export interface IAPIError {
	code: number;
	message: string;
	translation?: string;
}
