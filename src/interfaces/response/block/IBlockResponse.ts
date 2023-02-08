import { IBlockedUser } from "../../entities";

/**
 * Response model for the User Blacklist.
 */
export interface IBlockResponse {
	userId: string;
	isBlocked: boolean;
	blacklist: IBlockedUser[];
}
