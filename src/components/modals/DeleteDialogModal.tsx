import { useTranslation } from "react-i18next";
import { Modal } from "../ui/Modal";
import {createPortal} from "react-dom";
import {useActionsCreators, useAppDispatch} from "../../stores/hooks";
import {deleteDialog, dialogsActions} from "../../stores/slices/dialogs/dialogs";

interface DeleteDialogModalProps {
    isOpened: boolean;
    onClose: () => void;
    id: string;
}

export const DeleteDialogModal = ({ isOpened, onClose, id }: DeleteDialogModalProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const dialogStore = useActionsCreators(dialogsActions);

    const deleteDialogQuery =  () => {
        dispatch(deleteDialog({dialogId: id}))
            .unwrap()
            .then(() => dialogStore.deleteDialog({dialogId: id}))
            .finally(() => onClose());
    };

    return createPortal(
        <Modal
            isOpened={isOpened}
            onClose={onClose}
        >
            <Modal.Title>{t("dialog.modal.delete.title")}</Modal.Title>
            <Modal.Footer>
                <Modal.Button label={t("button.cancel")} />
                <Modal.Button
                    onSubmit={deleteDialogQuery}
                    label={t("button.delete")}
                    variant="danger"
                />
            </Modal.Footer>
        </Modal>,
        document.body
    );
}