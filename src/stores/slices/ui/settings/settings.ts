import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pages } from "@/components/settings/lib/pages";

/**
 * Default state for settings initial state.
 *
 * @interface SettingsState
 *
 * @property {boolean} isOpened - Determines if settings are opened.
 * @property {number | undefined} activePageId - Active page id.
 * @property {boolean} isDeleteAccountModalOpened - Determines if delete account modal is opened.
 */
interface SettingsState {
    isOpened: boolean;
    activePageId?: number;
    isDeleteAccountModalOpened: boolean;
}

/**
 * Initial state for settings slice.
 */
const initialState: SettingsState = {
    isOpened: false,
    activePageId: undefined,
    isDeleteAccountModalOpened: false,
};

/**
 * Settings slice.
 */
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
            const activePage = pages.find((page) => page.id === state.activePageId);
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
        },
    },
});

export const { reducer: settingsReducer, actions: settingsActions } = settingsSlice;
