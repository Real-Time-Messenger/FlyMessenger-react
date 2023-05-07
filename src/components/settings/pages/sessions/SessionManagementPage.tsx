import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { useWebSocket } from "@/hoc/WebSocketProvider";
import { getUserSessions } from "@/stores/slices/user/user";
import { Loader } from "@/components/ui/messenger/Loader";
import { SessionItem } from "@/components/settings/items";
import { DeleteAllSessionModal } from "@/components/settings/pages/sessions/modals/DeleteAllSessionsModal";

/**
 * Page component for managing user sessions.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SessionManagementPage: FC = () => {
    const [isModalOpened, setModalOpened] = useState<boolean>(false);

    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const sessions = useStateSelector((state) => state.user.current.sessions);
    const currentSession = sessions.find((session) => session.current);
    const filteredSessions = sessions.filter((session) => !session.current);

    const dispatch = useAppDispatch();

    const { destroySession } = useWebSocket();

    /**
     * Deletes all user sessions.
     */
    const deleteAllSessions = (): void => {
        for (const session of filteredSessions) {
            destroySession(session.id);
        }

        setModalOpened(false);
    };

    /**
     * Fetches user sessions on mount.
     */
    useEffect(() => {
        dispatch(getUserSessions())
            .unwrap()
            .catch(() => setError(true))
            .finally(() => setIsLoading(false));
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="my-5 flex h-full flex-col items-center justify-center">
                <Loader className="h-10 w-10" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-5 flex h-full flex-col items-center justify-center">
                <span className="text-center text-[#303030] dark:text-[#B8BAF2]">{t("settings.sessions.error")}</span>
            </div>
        );
    }

    return (
        <>
            <DeleteAllSessionModal
                onConfirm={deleteAllSessions}
                isOpened={isModalOpened}
                onClose={() => setModalOpened(false)}
            />

            <div className="mt-2.5 flex w-full flex-col border-t-4 border-t-[#CFD0D4] p-2.5 dark:border-t-[#2F384E20]">
                {currentSession && (
                    <div className="my-3 flex flex-col gap-2">
                        <span className="text-[#4C4C4C] dark:text-[#B8BAF2]">{t("settings.sessions.current")}</span>

                        <SessionItem canDelete={false} {...currentSession} />
                    </div>
                )}

                <button
                    onClick={() => setModalOpened(true)}
                    className="min-w-[180px] select-none rounded bg-[#E86C6C]/70 py-2 text-center text-[#161616] transition-colors enabled:hover:bg-[#E86C6C] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#E86C6C80] dark:text-[#FFFFFF] enabled:dark:hover:bg-[#E86C6C]/70"
                    disabled={filteredSessions.length === 0}
                >
                    {t("settings.sessions.deleteAll.title")}
                </button>

                {filteredSessions.length > 0 ? (
                    <>
                        <span className="my-3 mt-3 border-t border-t-[#CFD0D4] pt-3 text-[#4C4C4C] dark:border-t-[#2F384E20] dark:text-[#B8BAF2]">
                            {t("settings.sessions.count", { count: filteredSessions.length })}
                        </span>

                        <div className="no-scrollbar flex max-h-[400px] flex-col gap-3 overflow-auto">
                            {filteredSessions.map((session) => (
                                <SessionItem key={session.id} {...session} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="mt-5 flex h-full flex-col items-center justify-center border-t border-t-[#CFD0D4] pt-5 dark:border-t-[#2F384E20]">
                        <span className="text-center text-[#303030] dark:text-[#B8BAF2]">
                            {t("settings.sessions.empty")}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};
