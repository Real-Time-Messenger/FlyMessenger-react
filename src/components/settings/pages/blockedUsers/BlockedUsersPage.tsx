import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { getUserBlacklist } from "@/stores/slices/user/user";
import { Loader } from "@/components/ui/messenger/Loader";
import { BlockedUserItem } from "@/components/settings/items";

/**
 * Blocked users page component in the {@link SettingsWindow} component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const BlockedUsersPage: FC = () => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setError] = useState<boolean>(false);

    const blacklist = useStateSelector((state) => state.user.current.blacklist);

    const dispatch = useAppDispatch();

    /**
     * Fetch the user blacklist on mount.
     */
    useEffect(() => {
        setIsLoading(true);
        dispatch(getUserBlacklist())
            .unwrap()
            .catch(() => setError(true))
            .finally(() => setIsLoading(false));
    }, [dispatch]);

    if (!blacklist || blacklist.length === 0) {
        return (
            <div className="my-5 flex h-full flex-col items-center justify-center">
                <span className="text-center text-[#303030] dark:text-[#B8BAF2]">
                    {t("settings.blockedUsers.empty")}
                </span>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="my-5 flex h-full flex-col items-center justify-center">
                <Loader className="h-10 w-10" />
            </div>
        );
    }

    return (
        <div className="mt-2.5 flex w-full flex-col border-t-4 border-t-[#CFD0D4] p-2.5 dark:border-t-[#2F384E20]">
            <span className="my-3 text-[#4C4C4C] dark:text-[#B8BAF2]">
                {t("settings.blockedUsers.label", {
                    count: blacklist.length,
                })}
            </span>

            <div className="no-scrollbar flex h-full max-h-[400px] flex-col gap-3 overflow-auto">
                {blacklist.map((user) => (
                    <BlockedUserItem key={user.id} {...user} />
                ))}
            </div>
        </div>
    );
};
