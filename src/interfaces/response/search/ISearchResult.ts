import {IDialog} from "../../../entities";

/**
 * Response model for the Search (global and in dialog).
 */
export interface ISearchResult {
	dialogs?: IDialog[];
	messages: IDialog[];
	users?: IDialog[];
}
