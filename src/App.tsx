import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/m/HomePage";
import {useEffect, useState} from "react";
import {useActionsCreators, useAppDispatch, useStateSelector} from "./stores/hooks";
import {LoginPage} from "./pages/m/LoginPage";
import {SignupPage} from "./pages/m/SignupPage";
import {ForgotPasswordPage} from "./pages/m/ForgotPasswordPage";
import {ActivationPage} from "./pages/m/ActivationPage";
import {ResetPasswordPage} from "./pages/m/ResetPasswordPage";
import {NewDevicePage} from "./pages/m/NewDevicePage";
import {TwoFactorPage} from "./pages/m/TwoFactorPage";
import {sidebarActions} from "./stores/slices/ui/sidebar/sidebar";
import {useTranslation} from "react-i18next";
import {WebSocketProvider} from "./hoc/WebSocketProvider";
import {updateUser} from "./stores/slices/user/user";
import { MainPage } from "./pages/landing/MainPage";
import { FaqPage } from "./pages/landing/FaqPage";
import { PrivacyPage } from "./pages/landing/PrivacyPage";
import {TermsPage} from "./pages/landing/TermsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>
    },
    {
        path: "/faq",
        element: <FaqPage/>
    },
    {
        path: "/privacy",
        element: <PrivacyPage/>
    },
    {
        path: "/terms",
        element: <TermsPage/>
    },
    {
        path: "/m",
        element: <HomePage/>
    },
    {
        path: "/m/login",
        element: <LoginPage/>
    },
    {
        path: "/m/signup",
        element: <SignupPage/>
    },
    {
        path: "/m/forgot-password",
        element: <ForgotPasswordPage/>
    },
    {
        path: "/m/activate",
        element: <ActivationPage/>,
    },
    {
        path: "/m/reset-password",
        element: <ResetPasswordPage/>,
    },
    {
        path: "/m/new-device",
        element: <NewDevicePage/>,
    },
    {
        path: "/m/two-factor",
        element: <TwoFactorPage/>,
    },
    {
        path: "*",
        element: <HomePage/>
    }
]);

export default function App() {
    const {t, i18n} = useTranslation();

    const sidebarStore = useActionsCreators(sidebarActions);
    const currentUser = useStateSelector((state) => state.user.current);

    useEffect(() => {
        document.title = t("global.title");

        if (currentUser.id) {
            const darkMode = currentUser.settings.theme === "dark";
            sidebarStore.toggleDarkMode({state: darkMode});

            const language = currentUser.settings.language;
            i18n.changeLanguage(language);

            return;
        }

        const cookies = document.cookie.split("; ");
        const darkModeCookie = cookies.find((cookie) => cookie.includes("darkMode"));
        if (darkModeCookie) {
            const isDarkMode = darkModeCookie.split("=")[1];
            if (isDarkMode === "true") {
                sidebarStore.toggleDarkMode({state: false});
            } else {
                sidebarStore.toggleDarkMode({state: true});
            }
        }
    }, [currentUser]);


    return <RouterProvider router={router}/>;
}
