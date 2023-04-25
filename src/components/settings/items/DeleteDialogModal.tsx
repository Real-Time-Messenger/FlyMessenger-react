import { ModalProps } from "@/interfaces/components/ModalProps";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/ui/messenger/Modal";
import { FC } from "react";
import {useActionCreators, useAppDispatch, useStateSelector} from "@/stores/hooks";
import {deleteDialog, dialogActions} from "@/stores/slices/dialogs/dialogs";
import {sidebarActions} from "@/stores/slices/ui/sidebar/sidebar";
import {searchActions} from "@/stores/slices/search/search";

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

export const DeleteDialogModal: FC<DeleteDialogModalProps> = ({ id, isOpened, onClose }) => {
    const { t } = useTranslation();

    const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);

    const sidebarStore = useActionCreators(sidebarActions);
    const searchStore = useActionCreators(searchActions);
    const dialogStore = useActionCreators(dialogActions);
    const dispatch = useAppDispatch();

    const deleteDialogQuery = () => {
        dispatch(deleteDialog({dialogId: id}))
            .unwrap()
            .then(() => {
                if (activeDialog?.id === id) sidebarStore.toggleMobileSidebar(true);

                dialogStore.deleteDialog({dialogId: id});
                searchStore.reset();
            })
            .finally(() => onClose())
    };

    return (
        <Modal isOpened={isOpened} onClose={onClose}>
            <Modal.Title>{t("dialog.modal.delete.title")}</Modal.Title>
            <Modal.Footer>
                <Modal.Button label={t("button.cancel")} />
                <Modal.Button onSubmit={deleteDialogQuery} label={t("button.delete")} variant="danger" />
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDialogModal;
