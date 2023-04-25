import { createRef, FC, useState } from "react";
import { ModalProps } from "@/interfaces/components/ModalProps";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { IResponseValidationError } from "@/interfaces/response/error";
import { updateUser } from "@/stores/slices/user/user";
import { Modal } from "@/components/ui/messenger/Modal";

/**
 * Modal component for changing user display name.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ChangeDisplayNameModal: FC<ModalProps> = ({ isOpened, onClose }) => {
    const { t } = useTranslation();

    const user = useStateSelector((state) => state.user.current);

    const firstNameRef = createRef<HTMLInputElement>();
    const lastNameRef = createRef<HTMLInputElement>();

    const [error, setError] = useState<IResponseValidationError | undefined>();

    const dispatch = useAppDispatch();

    /**
     * Handler for updating the current user display name.
     */
    const onSubmit = () => {
        if (!firstNameRef.current || !lastNameRef.current) return;

        dispatch(updateUser({ firstName: firstNameRef.current.value, lastName: lastNameRef.current.value }))
            .unwrap()
            .then(() => onClose())
            .catch((e) => setError(e));
    };

    return (
        <Modal isOpened={isOpened} onClose={onClose} zIndex={3}>
            <Modal.Title>{t("settings.profile.modal.name.title")}</Modal.Title>

            <Modal.Content errorBoundary={{ error, setError }}>
                <Modal.Input
                    name="firstName"
                    label={t("users.name")}
                    placeholder={t("users.name").toString()}
                    defaultValue={user.firstName}
                    ref={firstNameRef}
                    maxLength={25}
                />

                <Modal.Input
                    name="lastName"
                    label={t("users.lastName")}
                    placeholder={t("users.lastName").toString()}
                    defaultValue={user?.lastName}
                    ref={lastNameRef}
                    maxLength={25}
                />
            </Modal.Content>

            <Modal.Footer>
                <Modal.Button variant="danger" label={t("button.cancel")} />
                <Modal.Button label={t("button.save")} onSubmit={onSubmit} />
            </Modal.Footer>
        </Modal>
    );
};
