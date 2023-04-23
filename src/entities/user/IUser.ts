import { IBlockedUser, ISession, ISettings } from "@/entities";

/**
 * Interface for the user model.
 *
 * @interface IUser
 *
 * @property {string} id - The user ID.
 * @property {string} username - The user username.
 * @property {string} email - The user email.
 * @property {string} firstName - The user first name.
 * @property {string} lastName - The user last name.
 * @property {string} photoURL - The user photo URL.
 * @property {boolean} isActive - The user active status.
 * @property {boolean | null} isOnline - The user online status.
 * @property {string | null} lastActivity - The user last activity.
 * @property {Date | undefined} createdAt - The user created date.
 */
interface IUserBase {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    isActive: boolean;
    isOnline: boolean | null;
    lastActivity: string | null;
    createdAt?: Date;
}

/**
 * Interface for the locally stored user data.
 *
 * @interface IUserLocalData
 *
 * @property {ISettings} settings - The user settings.
 * @property {ISession[]} sessions - The user sessions.
 * @property {IBlockedUser[]} blacklist - The user blocklist.
 */
export interface IUserLocalData {
    settings: ISettings;
    sessions: ISession[];
    blacklist: IBlockedUser[];
}

export type IUser = IUserBase & IUserLocalData;
export type UserKeys = keyof IUserBase & keyof IUserLocalData;
