import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {IDialog, IDialogMessage} from "../../../entities";
import {DialogKeys} from "../../../entities/dialogs/IDialog";

interface DialogsState {
    activeDialog?: IDialog;
    dialogs: IDialog[];
    status: "init" | "loading" | "error" | "success";
}

const initialState: DialogsState = {
    activeDialog: undefined,
    dialogs: [],
    status: "init",
}

export const getUserDialogs = createAsyncThunk(
    "dialogs/getUserDialogs",
    async () => {
        return await $api.get("dialogs/me").json<IDialog[]>();
    });

export const getMessages = createAsyncThunk(
    "dialogs/loadMoreMessages",
    async (payload: { dialogId: string, skip: number }) => {
        const {dialogId, skip} = payload;
        return await $api.get(`dialogs/${dialogId}/messages?skip=${skip}`).json<IDialogMessage[]>();
    });

export const createDialog = createAsyncThunk(
    "dialogs/createDialog",
    async (payload: { toUserId: string }) => {
        return await $api.post("dialogs", {json: payload}).json<IDialog>();
    });

export const updateDialog = createAsyncThunk(
    "dialogs/updateDialog",
    async (payload: { dialogId: string, data: DialogKeys }) => {
        const {dialogId, data} = payload;
        return await $api.put(`dialogs/${dialogId}`, {json: data}).json<{ dialogId: string, data: DialogKeys }>();
    });

export const deleteDialog = createAsyncThunk(
    "dialogs/deleteDialog",
    async (payload: { dialogId: string }) => {
        return await $api.delete(`dialogs/${payload.dialogId}`).json<IDialog>();
    });

const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        setActiveDialog(state, action: PayloadAction<{ id: string }>) {
            const dialog = state.dialogs.find((dialog) => dialog.id === action.payload.id);
            if (!dialog) return;

            state.activeDialog = dialog;
        },
        addMessage(state, action: PayloadAction<{ message: IDialogMessage, dialog: IDialog}>) {
            const {message, dialog: newDialog} = action.payload;

            let dialog = state.dialogs.find((dialog) => dialog.id === newDialog.id);
            if (!dialog) {
                state.dialogs.push(action.payload.dialog);
                dialog = action.payload.dialog;
                dialog.unreadMessages = 0;
            }

            dialog.messages.push(message);
            dialog.lastMessage = message;

            if (message.file) {
                dialog.images.push(message.file);
            }

            if (message.sender.id === dialog.user.id) {
                dialog.unreadMessages++;
            }

            if (state.activeDialog?.id === dialog.id) {
                state.activeDialog.messages.push(message);
            }
        },
        reset(state) {
            state.activeDialog = undefined;
            state.dialogs = [];
            state.status = "init";
        },
        blockUser(state, action: PayloadAction<{ userId: string, isBlocked: boolean }>) {
            const dialog = state.dialogs.find((dialog) => dialog.user.id === action.payload.userId);
            if (!dialog) return;

            dialog.user = {...dialog.user, isBlocked: action.payload.isBlocked};
        },
        deleteDialog(state, action: PayloadAction<{ dialogId: string }>) {
            const dialogIndex = state.dialogs.findIndex((dialog) => dialog.id === action.payload.dialogId);
            if (dialogIndex === -1) return;

            if (state.activeDialog?.id === action.payload.dialogId) {
                state.activeDialog = undefined;
            }

            state.dialogs.splice(dialogIndex, 1);
        },
        readMessage(state, action: PayloadAction<{ dialogId: string, messageId: string }>) {
            const dialog = state.dialogs.find((dialog) => dialog.id === action.payload.dialogId);
            const message = dialog?.messages.find((message) => message.id === action.payload.messageId);
            if (!dialog || !message) return;

            message.isRead = true;
            if (message.sender.id === dialog.user.id) dialog.unreadMessages--;
        },
        toggleUserOnline(state, action: PayloadAction<{ userId: string, isOnline: boolean | null, lastActivity: string | null }>) {
            const dialog = state.dialogs.find((dialog) => dialog.user.id === action.payload.userId);
            if (!dialog) return;

            dialog.user.isOnline = action.payload.isOnline;
            dialog.user.lastActivity = action.payload.lastActivity;

            if (!dialog.user.isOnline) {
                dialog.user.isTyping = false;
            }
        },
        toggleTyping(state, action: PayloadAction<{ dialogId: string, isTyping: boolean }>) {
            const dialog = state.dialogs.find((dialog) => dialog.id === action.payload.dialogId);
            if (!dialog) return;

            dialog.user.isTyping = action.payload.isTyping;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserDialogs.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getUserDialogs.fulfilled, (state, action: PayloadAction<IDialog[]>) => {
            state.status = "success";
            state.dialogs = action.payload;
        });
        builder.addCase(getUserDialogs.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(getMessages.fulfilled, (state, action: PayloadAction<IDialogMessage[]>) => {
            state.activeDialog?.messages.unshift(...action.payload);
        });
        builder.addCase(createDialog.fulfilled, (state, action: PayloadAction<IDialog>) => {
            state.dialogs.push(action.payload);

            state.activeDialog = action.payload;
        });
        builder.addCase(updateDialog.fulfilled, (state, action: PayloadAction<{ dialogId: string, data: DialogKeys }>) => {
            const {dialogId, data} = action.payload;

            const dialog = state.dialogs.find((dialog) => dialog.id === dialogId);
            if (!dialog) return;

            Object.assign(dialog, data);
        });
    }
});

export const {reducer: dialogsReducer, actions: dialogsActions} = dialogsSlice;