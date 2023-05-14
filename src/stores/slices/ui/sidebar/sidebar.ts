import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Default state for sidebar initial state.
 *
 * @interface InitialState
 *
 * @property {boolean} isSidebarOpened - Determines if sidebar is opened.
 * @property {boolean} isDarkMode - Determines if dark mode is enabled.
 * @property {string | undefined} activeLink - Active link.
 * @property {boolean} isMobileSidebarOpened - Determines if mobile sidebar is opened.
 */
interface InitialState {
    isSidebarOpened: boolean;
    isDarkMode: boolean;
    activeLink?: string;
    isMobileSidebarOpened: boolean;
}

/**
 * Initial state for sidebar slice.
 */
const initialState: InitialState = {
    isSidebarOpened: false,
    isDarkMode: false,
    activeLink: undefined,
    isMobileSidebarOpened: true,
};

/**
 * Sidebar slice.
 */
const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar(state, action: PayloadAction<boolean>) {
            state.isSidebarOpened = action.payload;
        },
        toggleDarkMode(state, action: PayloadAction<{ state?: boolean }>) {
            state.isDarkMode = action.payload?.state ?? !state.isDarkMode;

            if (state.isDarkMode) document.body.classList.add("dark");
            else document.body.classList.remove("dark");

            document.cookie = `darkMode=${state.isDarkMode}; path=/; max-age=31536000; SameSite=Lax`;
        },
        toggleSidebarLink(state, action: PayloadAction<{ label: string }>) {
            state.activeLink = action.payload.label;
        },
        reset(state) {
            state.isSidebarOpened = false;
            state.isDarkMode = false;
            state.activeLink = undefined;
            state.isMobileSidebarOpened = true;
        },
        toggleMobileSidebar(state, action: PayloadAction<boolean>) {
            state.isMobileSidebarOpened = action.payload;
        },
    },
});

export const { reducer: sidebarReducer, actions: sidebarActions } = sidebarSlice;
