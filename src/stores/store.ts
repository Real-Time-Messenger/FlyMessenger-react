import { configureStore } from "@reduxjs/toolkit";
import { dialogReducer } from "./slices/dialogs/dialogs";
import { sidebarReducer } from "./slices/ui/sidebar/sidebar";
import { userReducer } from "./slices/user/user";
import { searchReducer } from "./slices/search/search";
import { settingsReducer } from "./slices/ui/settings/settings";

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        user: userReducer,
        dialogs: dialogReducer,
        search: searchReducer,
        settings: settingsReducer,
    },
});
