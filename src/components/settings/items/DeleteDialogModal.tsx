import { ModalProps } from "@/interfaces/components/ModalProps";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/ui/messenger/Modal";
import { FC } from "react";

/**
 * Props for the {@link DeleteDialogModal} component.
 *
 * @interface DeleteDialogModalProps
 *
 * @extends {ModalProps}
 *
 * @property {string} id - The ID of the dialog to delete.
 */
interface DeleteDialogModalProps extends ModalProps {
    id: string;
}

export const DeleteDialogModal: FC<DeleteDialogModalProps> = ({ isOpened, onClose }) => {
    const { t } = useTranslation();

    const deleteDialog = async () => {
        // await DialogController.delete(id);
    };

    return (
        <Modal isOpened={isOpened} onClose={onClose}>
            <Modal.Title>{t("dialog.modal.delete.title")}</Modal.Title>
            <Modal.Footer>
                <Modal.Button label={t("button.cancel")} />
                <Modal.Button onSubmit={deleteDialog} label={t("button.delete")} variant="danger" />
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDialogModal;
