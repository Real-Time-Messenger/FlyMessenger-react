import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SidebarItemProps} from "../../../../components/layout/items/messanger/SidebarItem";

interface InitialState {
    isSidebarOpened: boolean;
    isDarkMode: boolean;
    activeLink?: string;
}

const initialState: InitialState = {
    isSidebarOpened: false,
    isDarkMode: false,
    activeLink: undefined,
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar(state, action: PayloadAction<{state: boolean}>) {
            state.isSidebarOpened = action.payload.state;
        },
        toggleDarkMode(state, action: PayloadAction<{state?: boolean}>) {
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
        }
    }
});

export const {reducer: sidebarReducer, actions: sidebarActions} = sidebarSlice;