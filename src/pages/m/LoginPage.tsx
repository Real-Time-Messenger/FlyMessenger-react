import { IAuthLoginRequest } from "@/interfaces/request";
import { useTranslation } from "react-i18next";
import { FormEvent, useState } from "react";
import { IAPIError, IResponseValidationError } from "@/interfaces/response/error";
import { useAppDispatch } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";
import { IAuthResponse } from "@/interfaces/response";
import { LoginEventTypes, loginUser } from "@/stores/slices/user/user";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button, RedirectLink, Input } from "@/components/ui/auth";

/**
 * User credentials for login.
 */
const initialAuthData: IAuthLoginRequest = {
    username: "",
    password: "",
};

/**
 * Login page in the authorization process.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const LoginPage = () => {
    const { t } = useTranslation();

    const [authData, setAuthData] = useState<IAuthLoginRequest>(initialAuthData);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<IResponseValidationError | IAPIError | null>(null);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    /**
     * Handles change event for inputs and updates {@link authData}.
     */
    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        setAuthData({
            ...authData,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    /**
     * Handler for success login.
     */
    const handleSuccessLogin = (response: IAuthResponse): void => {
        setError(null);

        const event = response.event as LoginEventTypes;

        switch (event) {
            case "ACTIVATION_REQUIRED":
                navigate("/m/activation");
                break;
            case "TWO_FACTOR":
                navigate("/m/two-factor");
                break;
            case "NEW_DEVICE":
                navigate("/m/new-device");
                break;
            default:
                navigate("/m");
        }
    };

    /**
     * Form handler for login.
     */
    const login = (): void => {
        setIsSubmitting(true);

        dispatch(loginUser(authData))
            .unwrap()
            .then((response) => handleSuccessLogin(response as IAuthResponse))
            .catch((error) => {
                // alert(error.message);
                setError(error);
            })
            .finally(() => setIsSubmitting(false));
    };

    return (
        <AuthLayout onSubmit={login} title={t("auth.login.title")}>
            <AuthLayout.Form>
                <AuthLayout.Header>
                    <AuthLayout.Title>{t("auth.login.title")}</AuthLayout.Title>
                </AuthLayout.Header>

                <AuthLayout.Body>
                    <Input
                        type="text"
                        label={t("users.username")}
                        name="username"
                        id="username"
                        onChange={handleChange}
                        placeholder={t("users.username").toString()}
                        errorBoundary={error as IResponseValidationError}
                    />
                    <Input
                        type="password"
                        label={t("users.password")}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        placeholder={t("users.password").toString()}
                        errorBoundary={error as IResponseValidationError}
                    />
                </AuthLayout.Body>

                <AuthLayout.ErrorBoundary error={error} />

                <AuthLayout.Buttons>
                    <Button
                        isSubmitting={isSubmitting}
                        label={t("auth.login.submit")}
                        variant="submit"
                        type="submit"
                        disabled={isSubmitting}
                    />
                </AuthLayout.Buttons>

                <AuthLayout.AdditionalLinks>
                    <RedirectLink to="/m/signup" label={t("auth.login.signup")} />
                    <RedirectLink to="/m/forgot-password" label={t("auth.login.forgotPassword")} />
                </AuthLayout.AdditionalLinks>
            </AuthLayout.Form>
        </AuthLayout>
    );
};
