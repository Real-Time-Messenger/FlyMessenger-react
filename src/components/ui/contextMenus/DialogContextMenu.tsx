import {PositionProps} from "../DialogItem";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {DeleteDialogModal} from "../../modals/DeleteDialogModal";
import {ContextMenu} from "../ContextMenu";
import {
    AnchorIcon,
    ArrowUpCircleIcon,
    BellIcon,
    BellOffIcon,
    BlockIcon,
    KeyIcon,
    TrashIcon,
    VolumeIcon,
    VolumeOffIcon
} from "../../icons";
import {useActionsCreators, useAppDispatch, useStateSelector} from "../../../stores/hooks";
import {dialogsActions, updateDialog} from "../../../stores/slices/dialogs/dialogs";
import {blockOrUnblockUser} from "../../../stores/slices/user/user";
import {DialogKeys} from "../../../entities/dialogs/IDialog";

interface DialogContextMenuProps {
    position: PositionProps;
    onClose: () => void;
    isOpened: boolean;
    user: {
        id: string;
        isBlocked: boolean;
    };
    dialog: {
        id: string;
        isPinned: boolean;
        isSoundEnabled: boolean;
        isNotificationsEnabled: boolean;
    };
}

export const DialogContextMenu = ({position, onClose, user, dialog, isOpened}: DialogContextMenuProps) => {
    const [deleteDialogAlert, setDeleteDialogAlert] = useState<boolean>(false);

    const {t} = useTranslation();

    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const pinnedDialogs = dialogs.filter((d) => d.isPinned);
    const canPinDialog = pinnedDialogs.length < 10;

    const dispatch = useAppDispatch();
    const dialogActions = useActionsCreators(dialogsActions);

    const updateDialogQuery = (field: DialogKeys): void => {
        dispatch(updateDialog({dialogId: dialog.id, data: field}));
    };

    const tryToBlockUser = (): void => {
        dispatch(blockOrUnblockUser({blacklistedUserId: user.id}))
            .unwrap()
            .then((result) => dialogActions.blockUser({userId: user.id, isBlocked: result.isBlocked}));
    };

    return (
        <>
            <DeleteDialogModal
                isOpened={deleteDialogAlert}
                onClose={() => setDeleteDialogAlert(false)}
                id={dialog.id}
            />

            <ContextMenu
                position={position}
                onClose={onClose}
                isOpened={isOpened}
            >
                {dialog.isPinned && !canPinDialog && (
                    <ContextMenu.Item
                        Icon={KeyIcon}
                        label={t("dialog.unpin")}
                        onClick={() => updateDialogQuery({isPinned: false})}
                    />
                )}

                {canPinDialog && (
                    <ContextMenu.Item
                        Icon={dialog.isPinned ? KeyIcon : AnchorIcon}
                        label={dialog.isPinned ? t("dialog.unpin") : t("dialog.pin")}
                        onClick={() => updateDialogQuery({isPinned: !dialog.isPinned})}
                    />
                )}

                <ContextMenu.Item
                    Icon={dialog.isSoundEnabled && dialog.isNotificationsEnabled ? BellIcon : BellOffIcon}
                    label={dialog.isSoundEnabled && dialog.isNotificationsEnabled ? t("dialog.sound.mute") : t("dialog.sound.unmute")}
                >
                    <ContextMenu.Item
                        Icon={dialog.isSoundEnabled ? VolumeIcon : VolumeOffIcon}
                        label={dialog.isSoundEnabled ? t("dialog.sound.mute") : t("dialog.sound.unmute")}
                        onClick={() =>
                            updateDialogQuery({
                                isSoundEnabled: !dialog.isSoundEnabled,
                            })
                        }
                    />
                    <ContextMenu.Item
                        variant={dialog.isNotificationsEnabled ? "danger" : "success"}
                        Icon={dialog.isNotificationsEnabled ? BellOffIcon : BellIcon}
                        label={dialog.isNotificationsEnabled ? t("dialog.notifications.mute") : t("dialog.notifications.unmute")}
                        onClick={() =>
                            updateDialogQuery({
                                isNotificationsEnabled: !dialog.isNotificationsEnabled,
                            })
                        }
                    />
                </ContextMenu.Item>
                <ContextMenu.Item
                    variant={user.isBlocked ? "success" : "danger"}
                    Icon={user.isBlocked ? ArrowUpCircleIcon : BlockIcon}
                    label={user.isBlocked ? t("dialog.unblock") : t("dialog.block")}
                    onClick={tryToBlockUser}
                />
                <ContextMenu.Item
                    variant="danger"
                    Icon={TrashIcon}
                    label={t("dialog.delete")}
                    onClick={() => setDeleteDialogAlert(true)}
                />
            </ContextMenu>
        </>
    );
}