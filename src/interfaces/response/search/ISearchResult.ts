import { IDialog } from "@/entities";

/**
 * Interface for the response of the search endpoint.
 *
 * @interface ISearchResult
 *
 * @property {IDialog[] | undefined} dialogs - The dialogs of the search result.
 * Possibly undefined if the search was not performed in the dialogs.
 * @property {IDialog[]} messages - The messages of the search result.
 * @property {IDialog[] | undefined} users - The users of the search result.
 * Possibly undefined if the search was not performed in the users.
 */
export interface ISearchResult {
    dialogs?: IDialog[];
    messages: IDialog[];
    users?: IDialog[];
}
