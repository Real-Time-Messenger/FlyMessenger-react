import {AuthLayout} from "../../components/pages/auth/layouts/AuthLayout";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {IResponseValidationError} from "../../interfaces/response/error";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../stores/hooks";
import {twoFactorAuth} from "../../stores/slices/user/user";
import {Button, Input } from "../../components/pages/auth/items";

export function TwoFactorPage() {
    const { t } = useTranslation();

    const [twoFactorCode, setTwoFactorCode] = useState<string>("");

    const [error, setError] = useState<IResponseValidationError | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const successCallback = () => {
        navigate("/m");

        setError(null);
        setIsSubmitting(false);
    };

    const twoFactor = () => {
        setIsSubmitting(true);

        dispatch(twoFactorAuth({code: twoFactorCode}))
            .unwrap()
            .then(() => successCallback())
            .catch((error) => setError(error))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <AuthLayout onSubmit={twoFactor} title={t("auth.two-factor.title")}>
            <AuthLayout.Form>
                <AuthLayout.Header>
                    <AuthLayout.Title>{t("auth.two-factor.title")}</AuthLayout.Title>

                    <AuthLayout.Description>{t("auth.two-factor.description")}</AuthLayout.Description>
                </AuthLayout.Header>

                <AuthLayout.Body>
                    <Input
                        type="password"
                        label={t("auth.two-factor.code")}
                        name="password"
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                        value={twoFactorCode}
                        placeholder={t("auth.two-factor.code").toString()}
                        errorBoundary={error as IResponseValidationError}
                        canBeVisible={false}
                    />
                </AuthLayout.Body>

                <AuthLayout.ErrorBoundary error={error} />

                <AuthLayout.Buttons>
                    <Button
                        isSubmitting={isSubmitting}
                        label={t("auth.two-factor.submit")}
                        variant="submit"
                        type="submit"
                    />
                </AuthLayout.Buttons>
            </AuthLayout.Form>
        </AuthLayout>
    );
}