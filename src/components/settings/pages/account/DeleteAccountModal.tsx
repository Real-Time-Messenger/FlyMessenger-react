import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Modal} from "../../../ui/Modal";
import {ModalProps} from "../../../../interfaces/components/ModalProps";
import {createPortal} from "react-dom";
import {useActionsCreators, useAppDispatch} from "../../../../stores/hooks";
import {deleteAccount} from "../../../../stores/slices/user/user";
import {sidebarActions} from "../../../../stores/slices/ui/sidebar/sidebar";
import {settingsActions} from "../../../../stores/slices/ui/settings/settings";
import {dialogsActions} from "../../../../stores/slices/dialogs/dialogs";
import {searchActions} from "../../../../stores/slices/search/search";
import {useNavigate} from "react-router-dom";

export const DeleteAccountModal: FC<ModalProps> = ({isOpened, onClose}: ModalProps) => {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const sidebarStore = useActionsCreators(sidebarActions);
    const settingsStore = useActionsCreators(settingsActions);
    const dialogsStore = useActionsCreators(dialogsActions);
    const searchStore = useActionsCreators(searchActions);

    const navigate = useNavigate();

    /**
     * Handler for `Delete Account` button.
     */
    const deleteAccountQuery = () => {
        dispatch(deleteAccount())
            .unwrap()
            .then(() => {
                searchStore.reset();
                settingsStore.reset();
                sidebarStore.reset();
                dialogsStore.reset();

                navigate("/m/login");
            });
    };

    return createPortal(
        <Modal
            isOpened={isOpened}
            onClose={onClose}
        >
            <Modal.Title>{t("settings.account.deleteAccount.title")}</Modal.Title>
            <Modal.Footer>
                <Modal.Button label={t("button.cancel")}/>
                <Modal.Button
                    onSubmit={deleteAccountQuery}
                    label={t("button.delete")}
                    variant="danger"
                />
            </Modal.Footer>
        </Modal>,
        document.body
    );
};
