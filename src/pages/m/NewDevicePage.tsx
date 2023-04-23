import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IAPIError, IResponseValidationError } from "@/interfaces/response/error";
import { useAppDispatch } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";
import { newDeviceLogin } from "@/stores/slices/user/user";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button, Input } from "@/components/ui/auth";

/**
 * New device activation page in the authorization process.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const NewDevicePage = () => {
    const { t } = useTranslation();

    const [newDeviceCode, setNewDeviceCode] = useState<string>("");
    const [error, setError] = useState<IResponseValidationError | IAPIError | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /**
     * Handler for success registration.
     */
    const successCallback = () => {
        setError(null);
        setIsSubmitting(false);

        navigate("/m");
    };

    /**
     * Form handler for signup.
     */
    const newDevice = async () => {
        setIsSubmitting(true);

        dispatch(newDeviceLogin({ code: newDeviceCode }))
            .unwrap()
            .then(() => successCallback())
            .catch((error) => setError(error))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <AuthLayout onSubmit={newDevice} title={t("auth.new-device.title")}>
            <AuthLayout.Form>
                <AuthLayout.Header>
                    <AuthLayout.Title>{t("auth.new-device.title")}</AuthLayout.Title>

                    <AuthLayout.Description>{t("auth.new-device.description")}</AuthLayout.Description>
                </AuthLayout.Header>

                <AuthLayout.Body>
                    <Input
                        type="password"
                        label={t("auth.new-device.code")}
                        name="password"
                        onChange={(event) => setNewDeviceCode(event.target.value)}
                        placeholder={t("auth.new-device.code").toString()}
                        canBeVisible={false}
                    />
                </AuthLayout.Body>

                <AuthLayout.ErrorBoundary error={error} />

                <AuthLayout.Buttons>
                    <Button
                        type="submit"
                        variant="submit"
                        isSubmitting={isSubmitting}
                        label={t("auth.new-device.submit")}
                    />
                </AuthLayout.Buttons>
            </AuthLayout.Form>
        </AuthLayout>
    );
};
