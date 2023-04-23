/**
 * Interface for the authentication request model.
 *
 * @interface IAuthLoginRequest
 *
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 */
export interface IAuthLoginRequest {
    username: string;
    password: string;
}

/**
 * Interface for the registration request model.
 *
 * @interface IAuthRegisterRequest
 *
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} passwordConfirm - The password confirmation of the user.
 */
export interface IAuthRegisterRequest {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
