/**
 * Interface for the blocked user model.
 *
 * @interface IBlockedUser
 *
 * @property {string} id - The user ID.
 * @property {string} username - The user username.
 * @property {string} firstName - The user first name.
 * @property {string} lastName - The user last name.
 * @property {string} photoURL - The user photo URL.
 */
export interface IBlockedUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    photoURL: string;
}
