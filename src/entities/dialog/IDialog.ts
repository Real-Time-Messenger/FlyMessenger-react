import { IDialogMessage } from "@/entities";

/**
 * User interface for the dialog.
 *
 * @interface IUserInDialog
 *
 * @property {string} id - The user ID.
 * @property {string} firstName - The user first name.
 * @property {string} lastName - The user last name.
 * @property {string} photoURL - The user photo URL.
 * @property {boolean | null} isOnline - The user online status.
 * @property {string | null} lastActivity - The user last activity.
 * @property {boolean} isBlocked - The user blocked status.
 * @property {boolean} isTyping - The user typing status.
 */
export interface IUserInDialog {
    id: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    isOnline: boolean | null;
    lastActivity: string | null;
    isBlocked: boolean;
    isTyping: boolean;
}

/**
 * Interface for the dialog model.
 *
 * @interface IDialog
 *
 * @property {string} id - The dialog ID.
 * @property {string} label - The dialog label.
 * @property {IUserInDialog} user - The dialog user.
 * @property {string[]} images - The dialog images.
 * @property {IDialogMessage[]} messages - The dialog messages.
 * @property {IDialogMessage | undefined} lastMessage - The dialog last message.
 * @property {number} unreadMessages - The dialog unread messages.
 * @property {boolean} isPinned - The dialog pinned status.
 * @property {boolean} isSoundEnabled - The dialog sound status.
 * @property {boolean} isNotificationsEnabled - The dialog notifications status.
 * @property {boolean} isMeBlocked - The dialog blocked status.
 */
export interface IDialog {
    id: string;
    label: string;
    user: IUserInDialog;
    images: string[];
    messages: IDialogMessage[];
    lastMessage?: IDialogMessage;
    unreadMessages: number;
    isPinned: boolean;
    isSoundEnabled: boolean;
    isNotificationsEnabled: boolean;
    isMeBlocked: boolean;
}

export type LastMessageInDialog = Pick<IDialog, "lastMessage">;
export type DialogKeys = Partial<IDialog>;
