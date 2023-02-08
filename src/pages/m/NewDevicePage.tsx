import {AuthLayout} from "../../components/pages/auth/layouts/AuthLayout";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {IAPIError, IResponseValidationError} from "../../interfaces/response/error";
import {useNavigate} from "react-router-dom";
import {Button, Input } from "../../components/pages/auth/items";
import {useAppDispatch} from "../../stores/hooks";
import {newDeviceLogin} from "../../stores/slices/user/user";

export const NewDevicePage = () => {
    const { t } = useTranslation();

    const [newDeviceCode, setNewDeviceCode] = useState<string>("");
    const [error, setError] = useState<IResponseValidationError | IAPIError | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const successCallback = () => {
        setError(null);
        setIsSubmitting(false);

        navigate("/m");
    };

    const newDevice = async () => {
        setIsSubmitting(true);

        dispatch(newDeviceLogin({code: newDeviceCode}))
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
}