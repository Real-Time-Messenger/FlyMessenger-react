import { Button, Input, RedirectLink } from "../../components/pages/auth/items";
import {AuthLayout} from "../../components/pages/auth/layouts/AuthLayout";
import {IAPIError, IResponseValidationError} from "../../interfaces/response/error";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useAppDispatch} from "../../stores/hooks";
import {sendForgotPasswordEmail} from "../../stores/slices/user/user";

export function ForgotPasswordPage() {
    const { t } = useTranslation();

    const [email, setEmail] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<IResponseValidationError | IAPIError | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    /**
     * Handler for success registration.
     */
    const successForgotPassword = () => {
        setError(null);

        setSuccess(true);
    };

    /**
     * Form handler for signup.
     */
    const sendResetPasswordEmail = () => {
        if (!email) return;

        setIsSubmitting(true);

        dispatch(sendForgotPasswordEmail({email}))
            .unwrap()
            .then(() => successForgotPassword())
            .catch((error) => setError(error))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <AuthLayout onSubmit={sendResetPasswordEmail} title={t("auth.forgot-password.title")}>
            <AuthLayout.Form>
                <AuthLayout.Header>
                    <AuthLayout.Title>{t("auth.forgot-password.title")}</AuthLayout.Title>

                    <AuthLayout.Description>{t("auth.forgot-password.description")}</AuthLayout.Description>
                </AuthLayout.Header>

                {success && <div className="my-3 text-green-500 text-center">{t("auth.forgot-password.success")}</div>}

                <AuthLayout.Body>
                    <Input
                        type="email"
                        label={t("auth.forgot-password.email")}
                        name="email"
                        placeholder={t("auth.forgot-password.email").toString()}
                        onChange={(e) => setEmail(e.target.value)}
                        errorBoundary={error as IResponseValidationError}
                    />
                </AuthLayout.Body>

                <AuthLayout.ErrorBoundary error={error as IAPIError} />

                <AuthLayout.Buttons>
                    <Button
                        onClick={sendResetPasswordEmail}
                        type="submit"
                        label={t("auth.forgot-password.submit")}
                        variant="submit"
                        isSubmitting={isSubmitting}
                        disabled={success}
                    />
                </AuthLayout.Buttons>

                <AuthLayout.AdditionalLinks>
                    <RedirectLink
                        to="/m/login"
                        label={t("auth.login.title")}
                    />

                    <RedirectLink
                        to="/m/signup"
                        label={t("auth.signup.title")}
                    />
                </AuthLayout.AdditionalLinks>
            </AuthLayout.Form>
        </AuthLayout>
    );
}