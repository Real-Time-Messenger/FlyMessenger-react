import { useTranslation } from "react-i18next";
import { useActionCreators, useAppDispatch } from "@/stores/hooks";
import { deleteDialog, dialogActions } from "@/stores/slices/dialogs/dialogs";
import { createPortal } from "react-dom";
import { Modal } from "@/components/ui/messenger/Modal";

/**
 * Props for the {@link DeleteDialogModal} component.
 *
 * @interface DeleteDialogModalProps
 *
 * @property {boolean} isOpened - The flag that indicates whether the modal is opened.
 * @property {() => void} onClose - The callback that will be called when the modal is closed.
 * @property {string} id - The dialog ID.
 */
interface DeleteDialogModalProps {
    isOpened: boolean;
    onClose: () => void;
    id: string;
}

/**
 * Modal for deleting a dialog.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DeleteDialogModal = ({ isOpened, onClose, id }: DeleteDialogModalProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const dialogStore = useActionCreators(dialogActions);

    /**
     * Dispatches the delete dialog query.
     */
    const deleteDialogQuery = (): void => {
        dispatch(deleteDialog({ dialogId: id }))
            .unwrap()
            .then(() => dialogStore.deleteDialog({ dialogId: id }))
            .finally(() => onClose());
    };

    return createPortal(
        <Modal isOpened={isOpened} onClose={onClose}>
            <Modal.Title>{t("dialog.modal.delete.title")}</Modal.Title>
            <Modal.Footer>
                <Modal.Button label={t("button.cancel")} />
                <Modal.Button onSubmit={deleteDialogQuery} label={t("button.delete")} variant="danger" />
            </Modal.Footer>
        </Modal>,
        document.body,
    );
};
