/**
 * Interface for dialog message sender.
 *
 * @interface Sender
 *
 * @property {string} id - The sender ID.
 * @property {string} photoURL - The sender photo URL.
 * @property {string} firstName - The sender first name.
 * @property {string} lastName - The sender last name.
 */
interface Sender {
    id: string;
    photoURL: string;
    firstName: string;
    lastName: string;
}

/**
 * Interface for a dialog message.
 *
 * @interface IDialogMessage
 *
 * @property {string} id - The message ID.
 * @property {Sender} sender - The message sender.
 * @property {string | undefined} text - The message text.
 * @property {string | undefined} file - The message file.
 * @property {boolean} isRead - The message read status.
 * @property {string} sentAt - The message sent date.
 */
export interface IDialogMessage {
    id: string;
    sender: Sender;
    text?: string;
    file?: string;
    isRead: boolean;
    sentAt: string;
    dialogId?: string;
}
