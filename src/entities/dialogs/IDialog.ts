import {IDialogMessage} from "./IDialogMessage";

/**
 * User model in Dialog model
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
 * Base interface for the Dialog model.
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
export interface DialogKeys extends Partial<IDialog> {}