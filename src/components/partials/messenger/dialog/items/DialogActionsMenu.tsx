import { FC, useState } from "react";
import classNames from "classnames";
import { ArrowUpCircleIcon, BlockIcon, MoreIcon, SearchIcon, TrashIcon } from "@/components/icons";
import { useActionCreators, useAppDispatch, useStateSelector } from "@/stores/hooks";
import { searchActions } from "@/stores/slices/search/search";
import { IUserInDialog } from "@/entities";
import { Dropdown } from "@/components/ui/messenger/Dropdown";
import { ModalProps } from "@/interfaces/components/ModalProps";
import { useTranslation } from "react-i18next";
import { blockOrUnblockUser } from "@/stores/slices/user/user";
import { dialogActions } from "@/stores/slices/dialogs/dialogs";
import { DeleteDialogModal } from "@/components/settings/items";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";

interface DialogActionsMenuProps {
    isUserSearching: boolean;
    user: IUserInDialog;
}

export const DialogActionsMenu: FC<DialogActionsMenuProps> = ({ isUserSearching, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const searchStore = useActionCreators(searchActions);
    const sidebarStore = useActionCreators(sidebarActions);

    const desktopSearch = () => {
        if (isUserSearching) {
            searchStore.setSearchableUser();
            sidebarStore.toggleMobileSidebar(false);

            return;
        }

        searchStore.setSearchableUser(user);
        sidebarStore.toggleMobileSidebar(true);
    };

    return (
        <>
            <button
                className={classNames(
                    "hidden items-center justify-center rounded-full p-2 transition-[background-color] hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65] sm:flex",
                    isUserSearching && "bg-[#C1C1C165] dark:bg-[#2F384E65]",
                )}
                onClick={desktopSearch}
            >
                <SearchIcon className="h-6 w-6 stroke-[2]" />
            </button>

            <button
                className="flex items-center justify-center rounded-full p-2 transition-[background-color] hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65] sm:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <MoreIcon className="h-6 w-6 rotate-90" />
            </button>

            <DialogActionsMenuDropdown isOpened={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

const DialogActionsMenuDropdown: FC<ModalProps> = ({ isOpened, onClose }) => {
    const { t } = useTranslation();

    const [deleteDialogAlert, setDeleteDialogAlert] = useState<boolean>(false);

    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialogId = useStateSelector((state) => state.dialogs.activeDialog?.id);
    const activeDialog = dialogs.find((dialog) => dialog.id === activeDialogId);
    const user = activeDialog?.user;

    const searchStore = useActionCreators(searchActions);
    const dialogStore = useActionCreators(dialogActions);

    const dispatch = useAppDispatch();

    /**
     * Dispatches the block or unblock (depends on the current state) user action.
     */
    const tryToBlockUser = (): void => {
        if (!user) return;

        dispatch(blockOrUnblockUser({ blacklistedUserId: user.id }))
            .unwrap()
            .then((result) => dialogStore.blockUser({ userId: user.id, isBlocked: result.isBlocked }));
    };

    if (!activeDialog) return null;
    return (
        <>
            <DeleteDialogModal
                isOpened={deleteDialogAlert}
                onClose={() => setDeleteDialogAlert(false)}
                id={activeDialog.id}
            />

            <Dropdown
                isOpened={isOpened}
                onClose={onClose}
                className="top-12 right-0 flex w-[200px] transition-colors lg:!hidden"
            >
                <Dropdown.Item
                    onClick={() => searchStore.setSearchableMobileUser(user)}
                    className="flex items-center gap-3 px-3 py-2 active:bg-[#C1C1C165] dark:active:bg-[#2F384E65]"
                >
                    <SearchIcon className="h-5 w-5 stroke-[1.5]" />
                    <span className="text-sm">{t("search.primary")}</span>
                </Dropdown.Item>

                <Dropdown.Item
                    className="flex items-center gap-3 px-3 py-2 active:bg-[#C1C1C165] dark:active:bg-[#2F384E65]"
                    onClick={tryToBlockUser}
                >
                    {activeDialog.user.isBlocked ? (
                        <>
                            <ArrowUpCircleIcon className="h-5 w-5 stroke-[1.5]" />
                            <span className="text-sm">{t("dialog.unblock")}</span>
                        </>
                    ) : (
                        <>
                            <BlockIcon className="h-5 w-5" />
                            <span className="text-sm">{t("dialog.block")}</span>
                        </>
                    )}
                </Dropdown.Item>

                <Dropdown.Item
                    className="flex items-center gap-3 px-3 py-2 text-[#E86C6C] dark:text-[#E86C6C]"
                    onClick={() => setDeleteDialogAlert(true)}
                >
                    <TrashIcon className="h-5 w-5 stroke-[1.5]" />
                    <span className="text-sm">{t("dialog.delete")}</span>
                </Dropdown.Item>
            </Dropdown>
        </>
    );
};
