/**
 * Interface for the Authorization Request model.
 */
export interface IAuthLoginRequest {
	username: string;
	password: string;
}

/**
 * Interface for the Registration Request model.
 */
export interface IAuthRegisterRequest {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
}
