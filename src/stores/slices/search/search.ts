import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { $api } from "../../../http";
import {IUser, IUserInDialog} from "../../../entities";
import {ISearchResult} from "../../../interfaces/response";

interface InitialState {
    selectedUser?: IUser | IUserInDialog
    selectedMessageId: string | null;
    isSearching: boolean
    searchResults: ISearchResult
}

const initialState: InitialState = {
    selectedUser: undefined,
    isSearching: false,
    searchResults: {messages: [], dialogs: [], users: []},
    selectedMessageId: null
}

export const sendSearch = createAsyncThunk(
    "search/sendSearch",
    async (searchQuery: string) => {
        return await $api.get(`search?query=${searchQuery}`).json<ISearchResult>();
    });

export const sendSearchByDialogId = createAsyncThunk(
    "search/sendSearchByDialogId",
    async (payload: { dialogId: string, searchQuery: string }) => {
        const {dialogId, searchQuery} = payload;
        return await $api.get(`search/${dialogId}?query=${searchQuery}`).json<ISearchResult>();
    });

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchableUser(state, action: PayloadAction<IUser | IUserInDialog | undefined>) {
            state.selectedUser = action.payload;
            state.searchResults = {messages: [], dialogs: [], users: []};
        },
        setSearchableMessageId(state, action: PayloadAction<string | null>) {
            state.selectedMessageId = action.payload;
        },
        clearSearch(state) {
            state.isSearching = false;
            state.selectedUser = undefined;
            state.searchResults = {messages: [], dialogs: [], users: []};
        },
        reset(state) {
            state.isSearching = false;
            state.selectedUser = undefined;
            state.searchResults = {messages: [], dialogs: [], users: []};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendSearch.pending, (state) => {
            state.isSearching = true;
        });
        builder.addCase(sendSearch.fulfilled, (state, action: PayloadAction<ISearchResult>) => {
            state.searchResults = action.payload;
        });
        builder.addCase(sendSearchByDialogId.fulfilled, (state, action: PayloadAction<ISearchResult>) => {
            state.searchResults = action.payload;
        });
    }
});

export const {reducer: searchReducer, actions: searchActions} = searchSlice;