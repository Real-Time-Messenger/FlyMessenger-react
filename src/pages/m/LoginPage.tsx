import {AuthLayout} from "../../components/pages/auth/layouts/AuthLayout";
import {useTranslation} from "react-i18next";
import {FormEvent, useState} from "react";
import {IAuthLoginRequest} from "../../interfaces/request";
import {IAPIError, IResponseValidationError} from "../../interfaces/response/error";
import {useAppDispatch, useStateSelector} from "../../stores/hooks";
import {LoginEventTypes, loginUser, LoginUserPayload, signupUser} from "../../stores/slices/user/user";
import {Button, Input, RedirectLink } from "../../components/pages/auth/items";
import {useNavigate} from "react-router-dom";
import {AnyObject} from "../../interfaces/AnyObject";

const initialAuthData: IAuthLoginRequest = {
    username: "",
    password: "",
};

export const LoginPage = () => {
    const { t } = useTranslation();

    const [authData, setAuthData] = useState<IAuthLoginRequest>(initialAuthData);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<IResponseValidationError | IAPIError | null>(null);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    /**
     * Handles change event for inputs and updates authData.
     */
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setAuthData({
            ...authData,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    /**
     * Handler for success login.
     */
    const handleSuccessLogin = (response: AnyObject) => {
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
    }

    const login = () => {
        setIsSubmitting(true);

        dispatch(loginUser(authData))
            .unwrap()
            .then((response) => handleSuccessLogin(response))
            .catch((error) => setError(error))
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

                <AuthLayout.ErrorBoundary error={error as IAPIError} />

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
                    <RedirectLink
                        to="/m/signup"
                        label={t("auth.login.signup")}
                    />
                    <RedirectLink
                        to="/m/forgot-password"
                        label={t("auth.login.forgotPassword")}
                    />
                </AuthLayout.AdditionalLinks>
            </AuthLayout.Form>
        </AuthLayout>
    );
}