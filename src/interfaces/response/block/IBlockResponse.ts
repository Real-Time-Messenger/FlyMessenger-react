import { IBlockedUser } from "@/entities";

/**
 * Interface for the response of the block user endpoint.
 *
 * @interface IBlockResponse
 *
 * @property {string} userId - The id of the user.
 * @property {boolean} isBlocked - Whether the user is blocked or not.
 * @property {IBlockedUser[]} blacklist - The blocklist of the user.
 */
export interface IBlockResponse {
    userId: string;
    isBlocked: boolean;
    blacklist: IBlockedUser[];
}
