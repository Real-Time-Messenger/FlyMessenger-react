import { IUser, IUserInDialog } from "@/entities";
import { ISearchResult } from "@/interfaces/response";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "@/http";

/**
 * Default state for search initial state.
 *
 * @interface InitialState
 *
 * @property {IUser | IUserInDialog | undefined} selectedUser - Selected user.
 * @property {string | null} selectedMessageId - Selected message id.
 * @property {boolean} isSearching - Determines if search is in progress.
 * @property {ISearchResult} searchResults - Search results.
 */
interface InitialState {
    selectedUser?: IUser | IUserInDialog;
    selectedMobileUser?: IUser | IUserInDialog;
    selectedMessageId: string | null;
    isSearching: boolean;
    searchResults: ISearchResult;
}

/**
 * Initial state for search slice.
 */
const initialState: InitialState = {
    selectedUser: undefined,
    selectedMobileUser: undefined,
    isSearching: false,
    searchResults: { messages: [], dialogs: [], users: [] },
    selectedMessageId: null,
};

/**
 * Async thunk for sending a search query.
 */
export const sendSearch = createAsyncThunk("search/sendSearch", async (searchQuery: string) => {
    return await $api.get(`search?query=${searchQuery}`).json<ISearchResult>();
});

/**
 * Async thunk for sending a search query by dialog id.
 */
export const sendSearchByDialogId = createAsyncThunk(
    "search/sendSearchByDialogId",
    async (payload: { dialogId: string; searchQuery: string }) => {
        const { dialogId, searchQuery } = payload;
        return await $api.get(`search/${dialogId}?query=${searchQuery}`).json<ISearchResult>();
    },
);

/**
 * Search slice.
 */
export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchableUser(state, action: PayloadAction<IUser | IUserInDialog | undefined>) {
            state.selectedUser = action.payload;
            state.searchResults = { messages: [], dialogs: [], users: [] };
        },
        setSearchableMobileUser(state, action: PayloadAction<IUser | IUserInDialog | undefined>) {
            state.selectedMobileUser = action.payload;
            state.searchResults = { messages: [], dialogs: [], users: [] };
        },
        setSearchableMessageId(state, action: PayloadAction<string | null>) {
            state.selectedMessageId = action.payload;
        },
        clearMobileSearch(state) {
            state.isSearching = false;
            state.selectedMobileUser = undefined;
            state.searchResults = { messages: [], dialogs: [], users: [] };
        },
        clearSearchResults(state) {
            state.isSearching = false;
            state.searchResults = { messages: [], dialogs: [], users: [] };
        },
        reset(state) {
            state.isSearching = false;
            state.selectedUser = undefined;
            state.searchResults = { messages: [], dialogs: [], users: [] };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendSearch.pending, (state) => {
            state.isSearching = true;
        });
        builder.addCase(sendSearch.fulfilled, (state, action: PayloadAction<ISearchResult>) => {
            state.searchResults = action.payload;
        });
        builder.addCase(sendSearchByDialogId.pending, (state) => {
            state.isSearching = true;
        });
        builder.addCase(sendSearchByDialogId.fulfilled, (state, action: PayloadAction<ISearchResult>) => {
            state.searchResults = action.payload;
        });
    },
});

export const { reducer: searchReducer, actions: searchActions } = searchSlice;
