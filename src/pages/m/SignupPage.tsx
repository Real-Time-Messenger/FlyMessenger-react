import {AuthLayout} from "../../components/pages/auth/layouts/AuthLayout";
import {IAuthRegisterRequest} from "../../interfaces/request";
import {useTranslation} from "react-i18next";
import {ChangeEvent, useState} from "react";
import {IAPIError, IResponseValidationError} from "../../interfaces/response/error";
import {Button, Input, RedirectLink} from "../../components/pages/auth/items";
import {useAppDispatch} from "../../stores/hooks";
import {signupUser} from "../../stores/slices/user/user";

// Default auth data for signup.
const initialAuthData: IAuthRegisterRequest = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
};

export const SignupPage = () => {
    const {t} = useTranslation();

    const [authData, setAuthData] = useState<IAuthRegisterRequest>(initialAuthData);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<IResponseValidationError | IAPIError | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    // const router = useRouter();
    const dispatch = useAppDispatch();

    /**
     * Handles change event for inputs and updates authData.
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthData({
            ...authData,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    /**
     * Handler for success registration.
     */
    const successSignup = async () => {
        setError(null);
        setSuccess(true);
    };

    /**
     * Resets all password fields.
     */
    const resetPasswords = () => {
        setAuthData({
            ...authData,
            password: "",
            passwordConfirm: "",
        });
    };

    /**
     * Handler if error occurs while registering.
     */
    const handleError = (error: IResponseValidationError | IAPIError) => {
        setError(error);

        // Reset passwords if any error occurs.
        resetPasswords();
    };

    /**
     * Form handler for signup.
     */
    const signup = () => {
        setIsSubmitting(true);

        dispatch(signupUser(authData))
            .unwrap()
            .then(async () => await successSignup())
            .catch((error) => handleError(error))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <AuthLayout onSubmit={signup} width={500} title={t("auth.signup.title")}>
            <AuthLayout.Form>
                <AuthLayout.Header>
                    <AuthLayout.Title>{t("auth.signup.title")}</AuthLayout.Title>

                    <AuthLayout.Description>{t("auth.signup.description")}</AuthLayout.Description>
                </AuthLayout.Header>

                <AuthLayout.Body>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="text"
                            label={t("users.username")}
                            name="username"
                            onChange={handleChange}
                            value={authData.username}
                            placeholder={t("users.username").toString()}
                            errorBoundary={error as IResponseValidationError}
                            className="shrink-0 grow-0"
                        />
                        <Input
                            type="email"
                            label={t("users.email")}
                            name="email"
                            onChange={handleChange}
                            value={authData.email}
                            placeholder={t("users.email").toString()}
                            errorBoundary={error as IResponseValidationError}
                            className="shrink grow"
                        />
                    </div>

                    <Input
                        type="password"
                        label={t("users.password")}
                        name="password"
                        onChange={handleChange}
                        value={authData.password}
                        placeholder={t("users.password").toString()}
                        errorBoundary={error as IResponseValidationError}
                    />
                    <Input
                        type="password"
                        label={t("users.passwordConfirm")}
                        name="passwordConfirm"
                        onChange={handleChange}
                        value={authData.passwordConfirm}
                        placeholder={t("users.passwordConfirm").toString()}
                        errorBoundary={error as IResponseValidationError}
                    />
                </AuthLayout.Body>

                <AuthLayout.ErrorBoundary error={error}/>

                <AuthLayout.Buttons>
                    {success && <span className="text-center text-sm text-[#45CA24]">{t("auth.signup.success")}</span>}

                    <Button
                        isSubmitting={isSubmitting}
                        label={t("auth.signup.submit")}
                        variant="submit"
                        type="submit"
                        disabled={success || isSubmitting}
                    />
                </AuthLayout.Buttons>

                <AuthLayout.AdditionalLinks>
                    <RedirectLink
                        to="/m/login"
                        label={t("auth.signup.haveAccount")}
                    />
                </AuthLayout.AdditionalLinks>
            </AuthLayout.Form>
        </AuthLayout>
    );
}