import { $api } from "@/http";
import { IDialog, IDialogMessage, ISession, IUser } from "@/entities";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyObject } from "@/interfaces/AnyObject";
import { ISettings } from "@/entities/user/ISettings";
import { IBlockResponse } from "@/interfaces/response";
import {handleKyException, sendNotification} from "@/helpers/helpers";
import { UserKeys } from "@/entities/user/IUser";

export type LoginEventTypes = "ACTIVATION_REQUIRED" | "TWO_FACTOR" | "NEW_DEVICE";

/**
 * Default state for user initial state.
 *
 * @interface UserState
 *
 * @property {IUser} current - Current user.
 * @property {string} loading - Loading state.
 */
interface UserState {
    current: IUser;
    loading: "idle" | "pending" | "succeeded" | "failed";
}

/**
 * Initial state for user slice.
 */
const initialState: UserState = {
    current: {} as IUser,
    loading: "idle",
};

/**
 * Async thunk for getting current user.
 */
export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async () => {
    return await $api.get("users/me").json<IUser>();
});

/**
 * Async thunk for logging in user.
 */
export const loginUser = createAsyncThunk(
    "user/login",
    async (data: { username: string; password: string }, { rejectWithValue }) => {
        try {
            return await $api.post("auth/login", { json: data }).json();
        } catch (error: any) {
            return handleKyException(error, rejectWithValue);
        }
    },
);

/**
 * Async thunk for signing up user.
 */
export const signupUser = createAsyncThunk(
    "user/signup",
    async (
        data: { username: string; email: string; password: string; passwordConfirm: string },
        { rejectWithValue },
    ) => {
        try {
            return await $api.post("auth/signup", { json: data }).json();
        } catch (error: any) {
            return handleKyException(error, rejectWithValue);
        }
    },
);

/**
 * Async thunk for validating a new device login.
 */
export const newDeviceLogin = createAsyncThunk(
    "user/newDeviceLogin",
    async (data: { code: string }, { rejectWithValue }) => {
        try {
            return await $api.post("auth/new-device", { json: data }).json();
        } catch (error: any) {
            return handleKyException(error, rejectWithValue);
        }
    },
);

/**
 * Async thunk for logging out user.
 */
export const logoutUser = createAsyncThunk("user/logout", async () => {
    try {
        return await $api.post("auth/logout").json<null>();
    } catch (error: any) {
        window.location.href = "/m/login";
    }
});

/**
 * Async thunk for sending forgot password email.
 */
export const sendForgotPasswordEmail = createAsyncThunk(
    "user/sendForgotPasswordEmail",
    async (data: { email: string }, { rejectWithValue }) => {
        try {
            return await $api.post("auth/call-reset-password", { json: data }).json();
        } catch (error: any) {
            return handleKyException(error, rejectWithValue);
        }
    },
);

/**
 * Async thunk for validating reset password token.
 */
export const validateResetPasswordToken = createAsyncThunk(
    "user/validateResetPasswordToken",
    async (data: { token: string }, { rejectWithValue }) => {
        try {
            return await $api.post("auth/validate-reset-password-token", { json: data }).json();
        } catch (error: any) {
            return handleKyException(error, rejectWithValue);
        }
    },
);

/**
 * Async thunk for resetting the password.
 */
export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (data: { token: string; password: string; passwordConfirm: string }, { rejectWithValue }) => {
        try {
            return await $api.post("auth/reset-password", { json: data }).json();
        } catch (error: any) {
            return handleKyException(error, rejectWithValue);
        }
    },
);

/**
 * Async thunk for sending two-factor auth code.
 */
export const twoFactorAuth = createAsyncThunk(
    "user/twoFactorAuth",
    async (data: { code: string }, { rejectWithValue }) => {
        try {
            return await $api.post("auth/two-factor", { json: data }).json();
        } catch (error: any) {
            return handleKyException(error, rejectWithValue);
        }
    },
);

/**
 * Async thunk for activating user.
 */
export const activateUser = createAsyncThunk(
    "user/activateUser",
    async (data: { token: string }, { rejectWithValue }) => {
        try {
            return await $api.post("auth/activate", { json: data }).json();
        } catch (error: any) {
            return handleKyException(error, rejectWithValue);
        }
    },
);

/**
 * Async thunk for updating user.
 */
export const updateUser = createAsyncThunk("user/updateUser", async (data: AnyObject, { rejectWithValue }) => {
    try {
        return await $api.put("users/me", { json: data }).json<UserKeys>();
    } catch (error: any) {
        const serverError = JSON.parse(await error.response.text());
        return rejectWithValue(serverError);
    }
});

/**
 * Async thunk for updating user avatar.
 */
export const updateAvatar = createAsyncThunk("user/updateAvatar", async (data: FormData, { rejectWithValue }) => {
    try {
        return await $api.put("users/me/avatar", { body: data }).json<{ photoURL: string }>();
    } catch (error: any) {
        const serverError = JSON.parse(await error.response.text());
        return rejectWithValue(serverError);
    }
});

/**
 * Async thunk for fetching user sessions.
 */
export const getUserSessions = createAsyncThunk("user/getUserSessions", async () => {
    return await $api.get("users/me/sessions").json<ISession[]>();
});

/**
 * Async thunk for fetching user blocklist.
 */
export const getUserBlacklist = createAsyncThunk("user/getUserBlacklist", async () => {
    return await $api.get("users/me/blacklist").json<IUser[]>();
});

/**
 * Async thunk for sending user block request (block or unblock).
 */
export const blockOrUnblockUser = createAsyncThunk("user/unblockUser", async (data: { blacklistedUserId: string }) => {
    return await $api.post("users/blacklist", { json: data }).json<IBlockResponse>();
});

/**
 * Async thunk for deleting user account.
 */
export const deleteAccount = createAsyncThunk("user/deleteAccount", async () => {
    return await $api.delete("users/me").json<null>();
});

/**
 * Async thunk for fetching user settings.
 */
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: IUser }>) {
            state.current = action.payload.user;
        },
        notify(
            state,
            action: PayloadAction<{
                message: IDialogMessage;
                dialogData: { isNotificationsEnabled: boolean; isSoundEnabled: boolean };
                fileTranslation: string;
            }>,
        ) {
            if (!state.current.settings.chatsNotificationsEnabled || !action.payload.dialogData.isNotificationsEnabled)
                return;

            sendNotification(state.current.id, {
                body: action.payload.message.text || action.payload.fileTranslation,
                icon: state.current.photoURL,
            });

            if (!state.current.settings.chatsSoundEnabled || !action.payload.dialogData.isSoundEnabled) return;

            const notifySound = new Audio("/src/assets/sounds/notification.mp3");
            notifySound.volume = 0.5;
            notifySound.play();
        },
        deleteSession(state, action: PayloadAction<{ sessionId: string }>) {
            state.current.sessions = state.current.sessions.filter(
                (session) => session.id !== action.payload.sessionId,
            );
        },
        deleteBlacklistedUser(state, action: PayloadAction<{ id: string }>) {
            state.current.blacklist = state.current.blacklist.filter((user) => user.id !== action.payload.id);
        },
        removeSession(state, action: PayloadAction<{ sessionId: string }>) {
            const sessionIndex = state.current.sessions.findIndex((session) => session.id === action.payload.sessionId);
            state.current.sessions.splice(sessionIndex, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state: UserState) => {
            state.loading = "succeeded";
        });
        builder.addCase(getCurrentUser.fulfilled, (state: UserState, action: PayloadAction<IUser>) => {
            state.loading = "succeeded";
            state.current = action.payload;
        });
        builder.addCase(logoutUser.fulfilled, (state: UserState) => {
            state.current = initialState.current;
        });
        builder.addCase(updateUser.fulfilled, (state: UserState, action: PayloadAction<AnyObject>) => {
            Object.keys(action.payload).forEach((key) => {
                if (key in state.current.settings) {
                    state.current.settings[key as keyof ISettings] = action.payload[key as keyof ISettings] as never;
                } else {
                    state.current[key as keyof IUser] = action.payload[key as keyof IUser] as never;
                }
            });
        });
        builder.addCase(updateAvatar.fulfilled, (state: UserState, action: PayloadAction<{ photoURL: string }>) => {
            state.current.photoURL = action.payload.photoURL;
        });
        builder.addCase(getUserSessions.fulfilled, (state: UserState, action: PayloadAction<ISession[]>) => {
            state.current.sessions = action.payload;
        });
        builder.addCase(getUserBlacklist.fulfilled, (state: UserState, action: PayloadAction<IUser[]>) => {
            state.current.blacklist = action.payload;
        });
        builder.addCase(blockOrUnblockUser.fulfilled, (state: UserState, action: PayloadAction<IBlockResponse>) => {
            state.current.blacklist = state.current.blacklist.filter((user) => user.id !== action.payload.userId);
        });
        builder.addCase(deleteAccount.fulfilled, (state: UserState) => {
            state.current = initialState.current;
        });
    },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
