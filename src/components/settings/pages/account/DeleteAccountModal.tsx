import { FC } from "react";
import { ModalProps } from "@/interfaces/components/ModalProps";
import { useTranslation } from "react-i18next";
import { useActionCreators, useAppDispatch } from "@/stores/hooks";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { settingsActions } from "@/stores/slices/ui/settings/settings";
import { dialogActions } from "@/stores/slices/dialogs/dialogs";
import { searchActions } from "@/stores/slices/search/search";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "@/stores/slices/user/user";
import { createPortal } from "react-dom";
import { Modal } from "@/components/ui/messenger/Modal";

/**
 * Modal component for deleting the account.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DeleteAccountModal: FC<ModalProps> = ({ isOpened, onClose }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const sidebarStore = useActionCreators(sidebarActions);
    const settingsStore = useActionCreators(settingsActions);
    const dialogStore = useActionCreators(dialogActions);
    const searchStore = useActionCreators(searchActions);

    const navigate = useNavigate();

    /**
     * Dispatches the delete account query.
     */
    const deleteAccountQuery = () => {
        dispatch(deleteAccount())
            .unwrap()
            .then(() => {
                searchStore.reset();
                settingsStore.reset();
                sidebarStore.reset();
                dialogStore.reset();

                navigate("/m/login");
            });
    };

    return createPortal(
        <Modal isOpened={isOpened} onClose={onClose} zIndex={3}>
            <Modal.Title>{t("settings.account.deleteAccount.title")}</Modal.Title>
            <Modal.Footer>
                <Modal.Button label={t("button.cancel")} />
                <Modal.Button onSubmit={deleteAccountQuery} label={t("button.delete")} variant="danger" />
            </Modal.Footer>
        </Modal>,
        document.body,
    );
};
