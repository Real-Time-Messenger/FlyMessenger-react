import { createRef, FC, useState } from "react";
import { ModalProps } from "@/interfaces/components/ModalProps";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { IResponseValidationError } from "@/interfaces/response/error";
import { updateUser } from "@/stores/slices/user/user";
import { Modal } from "@/components/ui/messenger/Modal";
import { useTranslation } from "react-i18next";

/**
 * Modal component for changing user email.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ChangeEmailModal: FC<ModalProps> = ({ isOpened, onClose }) => {
    const { t } = useTranslation();

    const email = useStateSelector((state) => state.user.current.email);

    const emailRef = createRef<HTMLInputElement>();
    const [error, setError] = useState<IResponseValidationError>();

    const dispatch = useAppDispatch();

    /**
     * Handler for updating current user email.
     */
    const onSubmit = (): void => {
        if (!emailRef.current) return;

        dispatch(updateUser({ email: emailRef.current.value }))
            .unwrap()
            .then(() => onClose())
            .catch((e) => setError(e));
    };

    return (
        <Modal isOpened={isOpened} onClose={onClose} zIndex={3}>
            <Modal.Title>{t("settings.profile.modal.email.title")}</Modal.Title>

            <Modal.Content errorBoundary={{ error, setError }}>
                <Modal.Input
                    name="email"
                    label={t("users.email")}
                    placeholder={t("users.email").toString()}
                    defaultValue={email}
                    ref={emailRef}
                    maxLength={255}
                    pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
                    type="email"
                />
            </Modal.Content>

            <Modal.Footer>
                <Modal.Button variant="danger" label={t("button.cancel")} />
                <Modal.Button label={t("button.save")} onSubmit={onSubmit} />
            </Modal.Footer>
        </Modal>
    );
};
