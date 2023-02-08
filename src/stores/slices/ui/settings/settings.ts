import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {pages} from "../../../../components/settings/SettingsWindow";

interface SettingsState {
    isOpened: boolean;
    activePageId?: number;
    isDeleteAccountModalOpened: boolean
}

const initialState: SettingsState = {
    isOpened: false,
    activePageId: undefined,
    isDeleteAccountModalOpened: false
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toggleSettings(state) {
            state.isOpened = !state.isOpened;
        },
        setActivePage(state, action: PayloadAction<number | undefined>) {
            state.activePageId = action.payload;
        },
        goBack(state) {
            const activePage = pages.find(page => page.id === state.activePageId);
            if (activePage?.PrevComponentId) {
                state.activePageId = activePage.PrevComponentId;

                return;
            }

            state.activePageId = undefined;
        },
        toggleDeleteAccountModal(state, action: PayloadAction<boolean>) {
            state.isDeleteAccountModalOpened = action.payload;
        },
        reset(state) {
            state.isOpened = false;
            state.activePageId = undefined;
        }
    }
});

export const {reducer: settingsReducer, actions: settingsActions} = settingsSlice;
