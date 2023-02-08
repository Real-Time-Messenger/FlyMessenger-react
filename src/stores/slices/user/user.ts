import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {sendNotification} from "../../../helpers/helpers";
import {IDialogMessage, ISession, ISettings, IUser} from "../../../entities";
import {$api} from "../../../http";
import {AnyObject} from "../../../interfaces/AnyObject";
import {IBlockResponse} from "../../../interfaces/response";
import {UserKeys} from "../../../entities/IUser";

export type LoginEventTypes = "ACTIVATION_REQUIRED" | "TWO_FACTOR" | "NEW_DEVICE";
export type LoginUserPayload = { token: string } | { event: string };

interface UserState {
    current: IUser;
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
    current: {
        id: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        photoURL: "",
        isActive: false,
        sessions: [],
        isOnline: false,
        lastActivity: null,
        settings: {} as ISettings,
        blacklist: []
    },
    loading: "idle",
}

export const getCurrentUser = createAsyncThunk(
    "user/getCurrentUser",
    async () => {
        return await $api.get("users/me").json<IUser>();
    }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async (data: { username: string, password: string }, {rejectWithValue}) => {
        try {
            return await $api.post("auth/login", {json: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const signupUser = createAsyncThunk(
    "user/signup",
    async (data: { username: string, email: string, password: string, passwordConfirm: string }, {rejectWithValue}) => {
        try {
            return await $api.post("auth/signup", {json: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const newDeviceLogin = createAsyncThunk(
    "user/newDeviceLogin",
    async (data: { code: string }, {rejectWithValue}) => {
        try {
            return await $api.post("auth/new-device", {json: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const logoutUser = createAsyncThunk(
    "user/logout",
    async () => {
        return await $api.post("auth/logout").json<null>();
    });

export const sendForgotPasswordEmail = createAsyncThunk(
    "user/sendForgotPasswordEmail",
    async (data: { email: string }, {rejectWithValue}) => {
        try {
            return await $api.post("auth/call-reset-password", {json: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    })

export const validateResetPasswordToken = createAsyncThunk(
    "user/validateResetPasswordToken",
    async (data: { token: string }, {rejectWithValue}) => {
        try {
            return await $api.post("auth/validate-reset-password-token", {json: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (data: { token: string, password: string, passwordConfirm: string }, {rejectWithValue}) => {
        try {
            return await $api.post("auth/reset-password", {json: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const twoFactorAuth = createAsyncThunk(
    "user/twoFactorAuth",
    async (data: { code: string }, {rejectWithValue}) => {
        try {
            return await $api.post("auth/two-factor", {json: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const activateUser = createAsyncThunk(
    "user/activateUser",
    async (data: { token: string }, {rejectWithValue}) => {
        try {
            return await $api.post("auth/activate", {json: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (data: AnyObject, {rejectWithValue}) => {
        try {
            return await $api.put("users/me", {json: data}).json<UserKeys>();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const updateAvatar = createAsyncThunk(
    "user/updateAvatar",
    async (data: FormData, {rejectWithValue}) => {
        try {
            return await $api.put("users/me/avatar", {body: data}).json();
        } catch (error: any) {
            const serverError = JSON.parse(await error.response.text());
            return rejectWithValue(serverError);
        }
    });

export const getUserSessions = createAsyncThunk(
    "user/getUserSessions",
    async () => {
        return await $api.get("users/me/sessions").json<ISession[]>();
    });

export const getUserBlacklist = createAsyncThunk(
    "user/getUserBlacklist",
    async () => {
        return await $api.get("users/me/blacklist").json<IUser[]>();
    });

export const blockOrUnblockUser = createAsyncThunk(
    "user/unblockUser",
    async (data: { blacklistedUserId: string }) => {
        return await $api.post("users/blacklist", {json: data}).json<IBlockResponse>();
    });

export const deleteAccount = createAsyncThunk(
    "user/deleteAccount",
    async () => {
        return await $api.delete("users/me").json<null>();
    });

const createExtraReducers = (builder: any) => {
    builder.addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction<LoginUserPayload>) => {
        state.loading = "succeeded";

        if ("token" in action.payload) return;
    });
    builder.addCase(getCurrentUser.fulfilled, (state: UserState, action: PayloadAction<IUser>) => {
        state.loading = "succeeded";
        state.current = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state: UserState) => {
        state.current = initialState.current;
    });
    builder.addCase(updateUser.fulfilled, (state: UserState, action: PayloadAction<UserKeys>) => {
        Object.keys(action.payload).forEach((key) => {
            if (key in state.current.settings) {
                state.current.settings[key as keyof ISettings] = action.payload[key];
            } else {
                state.current[key as keyof IUser] = action.payload[key];
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
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: IUser }>) {
            state.current = action.payload.user;
        },
        notify(state, action: PayloadAction<{ message: IDialogMessage, dialogData: { isNotificationsEnabled: boolean, isSoundEnabled: boolean }, fileTranslation: string }>) {
            if (!state.current.settings.chatsNotificationsEnabled || !action.payload.dialogData.isNotificationsEnabled) return;

            const silent = !state.current.settings.chatsSoundEnabled || !action.payload.dialogData.isSoundEnabled;

            sendNotification(state.current.id, {
                body: action.payload.message.text || action.payload.fileTranslation,
                icon: state.current.photoURL,
            })

            if (silent) return;

            const notifySound = new Audio("/src/sounds/notification.mp3");
            notifySound.volume = 0.5;
            notifySound.play().catch(() => {
            });
        },
        deleteSession(state, action: PayloadAction<{ sessionId: string }>) {
            state.current.sessions = state.current.sessions.filter((session) => session.id !== action.payload.sessionId);
        },
        deleteBlacklistedUser(state, action: PayloadAction<{ id: string }>) {
            state.current.blacklist = state.current.blacklist.filter((user) => user.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        createExtraReducers(builder);
    }
});

export const {reducer: userReducer, actions: userActions} = userSlice;