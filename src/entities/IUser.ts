import { IBlockedUser } from "./IBlockedUser";
import { ISession } from "./ISession";
import { ISettings } from "./ISettings";

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

export interface IUserLocalData {
	settings: ISettings;
	sessions: ISession[];
	blacklist: IBlockedUser[];
}

export type IUser = IUserBase & IUserLocalData;
export type UserKeys = keyof IUserBase & keyof IUserLocalData;