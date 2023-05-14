import { createBrowserRouter } from "react-router-dom";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import { FaqPage, MainPage, PrivacyPage, TermsPage } from "@/pages/landing";
import {
    ActivationPage,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    NewDevicePage,
    ResetPasswordPage,
    SignupPage,
    TwoFactorPage,
} from "@/pages/m";
import { MainLayout } from "@/components/layouts/MainLayout";

/**
 * The router for the application.
 */
export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <LandingLayout>
                <MainPage />
            </LandingLayout>
        ),
    },
    {
        path: "/faq",
        element: (
            <LandingLayout>
                <FaqPage />
            </LandingLayout>
        ),
    },
    {
        path: "/privacy",
        element: (
            <LandingLayout>
                <PrivacyPage />
            </LandingLayout>
        ),
    },
    {
        path: "/terms",
        element: (
            <LandingLayout>
                <TermsPage />
            </LandingLayout>
        ),
    },
    {
        path: "/m",
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
    {
        path: "/m/login",
        element: <LoginPage />,
    },
    {
        path: "/m/signup",
        element: <SignupPage />,
    },
    {
        path: "/m/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/m/activate",
        element: <ActivationPage />,
    },
    {
        path: "/m/reset-password",
        element: <ResetPasswordPage />,
    },
    {
        path: "/m/new-device",
        element: <NewDevicePage />,
    },
    {
        path: "/m/two-factor",
        element: <TwoFactorPage />,
    },
    {
        path: "*",
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
]);
