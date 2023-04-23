import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IAPIError, IResponseValidationError } from "@/interfaces/response/error";
import { useAppDispatch } from "@/stores/hooks";
import { resetPassword, validateResetPasswordToken } from "@/stores/slices/user/user";
import { SmoothSpawn } from "@/components/layouts/extra/SmoothSpawn";
import { Loader } from "@/components/ui/messenger/Loader";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { WarningIcon } from "@/components/icons";
import { Button, Input, RedirectLink } from "@/components/ui/auth";

/**
 * Reset the password page in the authorization process.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export function ResetPasswordPage() {
    const { t } = useTranslation();

    const [searchParams] = useSearchParams();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

    const [error, setError] = useState<IResponseValidationError | IAPIError | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /**
     * Function to validate the token in the URL.
     */
    const validateToken = useCallback((): void => {
        const token = searchParams.get("token");
        if (!token) {
            setIsTokenValid(false);
            return;
        }

        setIsFetching(true);

        dispatch(validateResetPasswordToken({ token }))
            .unwrap()
            .then(() => setIsTokenValid(true))
            .catch((error) => handleInvalidToken(error))
            .finally(() => setIsFetching(false));
    }, [dispatch, searchParams]);

    /**
     * Handler for invalid token.
     *
     * @param {IResponseValidationError | IAPIError} error - Error response.
     */
    const handleInvalidToken = (error: IResponseValidationError | IAPIError) => {
        setError(error);
        setIsTokenValid(false);
    };

    /**
     * Function to reset the password.
     */
    const resetPasswordQuery = useCallback((): void => {
        const token = searchParams.get("token");

        if (!token) return;

        setIsSubmitting(true);

        dispatch(resetPassword({ token, password, passwordConfirm }))
            .unwrap()
            .then(() => navigate("/m/login"))
            .catch((error) => setError(error))
            .finally(() => setIsSubmitting(false));
    }, [dispatch, navigate, password, passwordConfirm, searchParams]);

    /**
     * Attempt to validate the token on mount.
     */
    useEffect(() => {
        validateToken();
    }, [validateToken]);

    if (isFetching) {
        return (
            <SmoothSpawn>
                <Loader className="mx-auto h-[40px] w-[40px]" />
            </SmoothSpawn>
        );
    }

    if ((!isTokenValid || !isTokenValid) && error && !isFetching) {
        return (
            <AuthLayout title={t("errors.unexpectedError")}>
                <div className="flex flex-col items-center justify-center gap-3 py-5">
                    <WarningIcon className="h-16 w-16 stroke-2 text-[#E86C6C]" />

                    <div className="flex flex-col">
                        <span className="text-center text-xl dark:text-[#E3E3FA]">{t("errors.unexpectedError")}</span>

                        <span className="mt-1 text-center text-gray-500 dark:text-[#AFAFAF]">
                            {error && "translation" in error && error.translation && t(`errors.${error.translation}`)}
                        </span>

                        <div className="mt-5 flex items-center justify-center">
                            <RedirectLink to="/m/login" label={t("auth.activate.backToLogin")} variant="primary" />
                        </div>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout onSubmit={resetPasswordQuery} title={t("auth.reset-password.title")}>
            <AuthLayout.Form>
                <AuthLayout.Header>
                    <AuthLayout.Title>{t("auth.reset-password.title")}</AuthLayout.Title>
                    <AuthLayout.Description>{t("auth.reset-password.description")}</AuthLayout.Description>
                </AuthLayout.Header>

                <AuthLayout.Body>
                    <Input
                        type="password"
                        label={t("auth.reset-password.newPassword")}
                        name="password"
                        placeholder={t("auth.reset-password.newPassword").toString()}
                        onChange={(e) => setPassword(e.target.value)}
                        errorBoundary={error as IResponseValidationError}
                    />

                    <Input
                        type="password"
                        label={t("auth.reset-password.passwordConfirm")}
                        name="passwordConfirm"
                        placeholder={t("auth.reset-password.passwordConfirm").toString()}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        errorBoundary={error as IResponseValidationError}
                    />
                </AuthLayout.Body>

                <AuthLayout.ErrorBoundary error={error} />

                <AuthLayout.Buttons>
                    <Button
                        onClick={resetPasswordQuery}
                        type="submit"
                        label={t("auth.reset-password.submit")}
                        variant="submit"
                        isSubmitting={isSubmitting}
                    />
                </AuthLayout.Buttons>
            </AuthLayout.Form>
        </AuthLayout>
    );
}
