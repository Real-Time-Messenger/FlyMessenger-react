import { ModalProps } from "@/interfaces/components/ModalProps";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useKeyPress } from "@/hooks";
import { Modal } from "@/components/ui/messenger/Modal";

/**
 * Props for the {@link DeleteSessionModal} component.
 *
 * @interface SessionDeleteModalProps
 *
 * @extends {ModalProps}
 *
 * @property {string} id - Session ID.
 */
interface SessionDeleteModalProps extends ModalProps {
    onConfirm: () => void;
}

/**
 * Modal component for deleting a session.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DeleteSessionModal: FC<SessionDeleteModalProps> = ({ isOpened, onClose, onConfirm }) => {
    const { t } = useTranslation();

    return (
        <Modal isOpened={isOpened} onClose={onClose} zIndex={3}>
            <Modal.Title>{t("settings.sessions.delete.title")}</Modal.Title>
            <Modal.Footer>
                <Modal.Button
                    label={t("button.cancel")}
                    className="bg-[#CAD5F2] text-[#4C4C4C] hover:bg-[#B8BAF2] dark:bg-[#B8BAF210] dark:text-[#B8BAF2] dark:hover:bg-[#B8BAF230]"
                />
                <Modal.Button
                    variant="danger"
                    onSubmit={onConfirm}
                    label={t("button.delete")}
                    className="bg-[#E86C6C70] text-[#4C4C4C] hover:bg-[#E88383] dark:bg-[#E86C6C10] dark:text-[#E86C6C] dark:hover:bg-[#E86C6C30]"
                />
            </Modal.Footer>
        </Modal>
    );
};
