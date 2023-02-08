/**
 * Base interface for the Dialog Message model.
 */
export interface IDialogMessage {
	id: string;
	sender: {
		id: string;
		photoURL: string;
	};
	text?: string;
	file?: string;
	isRead: boolean;
	sentAt: string;
}
