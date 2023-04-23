import { PositionProps } from "@/components/ui/messenger/dialog/DialogItem";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActionCreators, useAppDispatch, useStateSelector } from "@/stores/hooks";
import { dialogActions, updateDialog } from "@/stores/slices/dialogs/dialogs";
import { DialogKeys } from "@/entities/dialog/IDialog";
import { blockOrUnblockUser } from "@/stores/slices/user/user";
import { DeleteDialogModal } from "@/components/settings/items";
import { ContextMenu } from "@/components/ui/messenger/ContextMenu";
import {
    AnchorIcon,
    ArrowUpCircleIcon,
    BellIcon,
    BellOffIcon,
    BlockIcon,
    KeyIcon,
    TrashIcon,
    VolumeIcon,
    VolumeOffIcon,
} from "@/components/icons";

/**
 * Props for the {@link DialogContextMenu} component.
 *
 * @interface DialogContextMenuProps
 *
 * @property {PositionProps} position - The position of the context menu.
 * @property {() => void} onClose - The callback that will be called when the context menu is closed.
 * @property {boolean} isOpened - The flag that indicates whether the context menu is opened.
 * @property {{id: string; isBlocked: boolean}} user - The user data.
 * @property {{id: string; isPinned: boolean; isSoundEnabled: boolean; isNotificationsEnabled: boolean}} dialog - The dialog data.
 * @property {boolean} deleteDialogAlert - The flag that indicates whether the deleted dialog alert is opened.
 * @property {(value: boolean) => void} setDeleteDialogAlert - The callback that will be called when the deleted dialog alert is opened.
 * @property {() => void} tryToBlockUser - The callback that will be called when the user is blocked.
 */
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

/**
 * Context menu for the `DialogItem` component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DialogContextMenu: FC<DialogContextMenuProps> = ({ position, onClose, user, dialog, isOpened }) => {
    const [deleteDialogAlert, setDeleteDialogAlert] = useState<boolean>(false);

    const { t } = useTranslation();

    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const pinnedDialogs = dialogs.filter((d) => d.isPinned);
    const canPinDialog = pinnedDialogs.length < 10;

    const dispatch = useAppDispatch();
    const dialogStore = useActionCreators(dialogActions);

    /**
     * Dispatches the update dialog action.
     */
    const updateDialogQuery = (field: DialogKeys): void => {
        dispatch(updateDialog({ dialogId: dialog.id, data: field }));
    };

    /**
     * Dispatches the block or unblock (depends on the current state) user action.
     */
    const tryToBlockUser = (): void => {
        dispatch(blockOrUnblockUser({ blacklistedUserId: user.id }))
            .unwrap()
            .then((result) => dialogStore.blockUser({ userId: user.id, isBlocked: result.isBlocked }));
    };

    return (
        <>
            <DeleteDialogModal
                isOpened={deleteDialogAlert}
                onClose={() => setDeleteDialogAlert(false)}
                id={dialog.id}
            />

            <ContextMenu position={position} onClose={onClose} isOpened={isOpened}>
                {dialog.isPinned && !canPinDialog && (
                    <ContextMenu.Item
                        Icon={KeyIcon}
                        label={t("dialog.unpin")}
                        onClick={() => updateDialogQuery({ isPinned: false })}
                    />
                )}

                {canPinDialog && (
                    <ContextMenu.Item
                        Icon={dialog.isPinned ? KeyIcon : AnchorIcon}
                        label={dialog.isPinned ? t("dialog.unpin") : t("dialog.pin")}
                        onClick={() => updateDialogQuery({ isPinned: !dialog.isPinned })}
                    />
                )}

                <ContextMenu.Item
                    Icon={dialog.isSoundEnabled && dialog.isNotificationsEnabled ? BellOffIcon : BellIcon}
                    label={
                        dialog.isSoundEnabled && dialog.isNotificationsEnabled
                            ? t("dialog.sound.mute")
                            : t("dialog.sound.unmute")
                    }
                >
                    <ContextMenu.Item
                        Icon={dialog.isSoundEnabled ? VolumeOffIcon : VolumeIcon}
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
                        label={
                            dialog.isNotificationsEnabled
                                ? t("dialog.notifications.mute")
                                : t("dialog.notifications.unmute")
                        }
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
};
