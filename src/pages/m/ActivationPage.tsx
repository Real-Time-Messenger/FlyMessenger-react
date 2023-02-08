import { AuthLayout } from "../../components/pages/auth/layouts/AuthLayout";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {IAPIError, IResponseValidationError} from "../../interfaces/response/error";
import { RedirectLink } from "../../components/pages/auth/items";
import {SuccessIcon, WarningIcon } from "../../components/icons";
import { Loader } from "../../components/ui/Loader";
import {useAppDispatch} from "../../stores/hooks";
import {activateUser} from "../../stores/slices/user/user";

export const ActivationPage = () => {
    const { t } = useTranslation();

    const [searchParams] = useSearchParams();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<IResponseValidationError | IAPIError | null>(null);

    const token = searchParams.get("token");

    const dispatch = useAppDispatch();

    /**
     * Handler for success activation.
     */
    const successActivation = useCallback(() => {
        setError(null);
        setIsSuccess(true);
    }, []);

    /**
     * Function to activate account.
     */
    const activate = useCallback(() => {
        if (!token) return;

        dispatch(activateUser({token}))
            .unwrap()
            .then(() => successActivation())
            .catch((error) => setError(error));
    }, [successActivation, token]);

    // Call activate function on mount.
    useEffect(() => {
        activate();
    }, [activate]);

    if (!token) {
        return (
            <AuthLayout title={t("auth.activate.emptyToken")}>
                <div className="my-5 flex flex-col items-center justify-center">
                    <WarningIcon className="h-20 w-20 stroke-[3] text-[#E86C6C]" />

                    <span className="my-5 text-center dark:text-[#E3E3FA]">{t("auth.activate.emptyToken")}</span>

                    <RedirectLink
                        to="/m/login"
                        label={t("auth.activate.backToLogin")}
                        variant="primary"
                    />
                </div>
            </AuthLayout>
        );
    }

    /**
     * Our request is still in progress.
     */
    if (!isSuccess && !error) {
        return (
            <AuthLayout title={t("auth.activate.activating")}>
                <div className="my-5 flex flex-col items-center justify-center gap-3">
                    <Loader className="h-10 w-10" />

                    <span className="my-5 text-center dark:text-[#E3E3FA]">{t("auth.activate.activating")}</span>
                </div>
            </AuthLayout>
        );
    }

    if (error) {
        return (
            <AuthLayout title={t("errors.unexpectedError")}>
                    <div className="flex flex-col items-center justify-center gap-3 py-5">
                        <WarningIcon className="h-16 w-16 stroke-2 text-[#E86C6C]"/>

                        <div className="flex flex-col">
                        <span
                            className="text-center text-xl font-semibold dark:text-[#E3E3FA]">{t("errors.unexpectedError")}</span>

                            <span
                                className="mt-1 text-center text-gray-500 dark:text-[#AFAFAF]">{error && "translation" in error && error.translation && t(`errors.${error.translation}`)}</span>

                            <div className="mt-5 flex items-center justify-center">
                                <RedirectLink
                                    to="/m/login"
                                    label={t("auth.activate.backToLogin")}
                                    variant="primary"
                                />
                            </div>
                        </div>
                    </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title={t("auth.activate.success")}>
            <div className="my-5 flex flex-col items-center justify-center gap-3">
                <SuccessIcon className="h-20 w-20 stroke-[3] text-[#4BB543]" />

                <span className="my-5 text-center dark:text-[#E3E3FA]">{t("auth.activate.success")}</span>

                <RedirectLink
                    to="/m/login"
                    label={t("auth.activate.backToLogin")}
                    variant="primary"
                />
            </div>
        </AuthLayout>
    );
}