import {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {SessionItem} from "../../items";
import {useAppDispatch, useStateSelector} from "../../../../stores/hooks";
import {getUserSessions} from "../../../../stores/slices/user/user";
import {Loader} from "../../../ui/Loader";
import {useWebSocket} from "../../../../hoc/WebSocketProvider";

export const SessionManagementPage: FC = () => {
    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const sessions = useStateSelector((state) => state.user.current.sessions)
    const currentSession = sessions.find((session) => session.current);
    const filteredSessions = sessions.filter((session) => !session.current);

    const dispatch = useAppDispatch();

    const {destroySession} = useWebSocket()

    const deleteAllSessions = () => {
        for (const session of filteredSessions) {
            destroySession(session.id);
        }
    }

    useEffect(() => {
        dispatch(getUserSessions())
            .unwrap()
            .catch(() => setError(true))
            .finally(() => setIsLoading(false));
    }, [dispatch])

    if (isLoading) {
        return (
            <div className="my-5 flex h-full flex-col items-center justify-center">
                <Loader className="h-10 w-10"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-5 flex h-full flex-col items-center justify-center">
                <span className="text-center text-[#303030] dark:text-[#B8BAF2]">{t("sessions.error")}</span>
            </div>
        );
    }

    return (
        <>
            <div className="mt-2.5 flex w-full flex-col border-t-4 border-t-[#CFD0D4] p-2.5 dark:border-t-[#2F384E20]">
                {currentSession && (
                    <div className="my-3 flex flex-col gap-2">
                        <span className="text-[#4C4C4C] dark:text-[#B8BAF2]">{t("settings.sessions.current")}</span>

                        <SessionItem
                            canDelete={false}
                            {...currentSession}
                        />
                    </div>
                )}

                <button onClick={deleteAllSessions}
                        className="duration-250 min-w-[180px] select-none rounded py-2 text-center transition-colors bg-[#E86C6C]/70 dark:bg-[#E86C6C80] text-[#161616] dark:text-[#FFFFFF] enabled:hover:bg-[#E86C6C] enabled:dark:hover:bg-[#E86C6C]/70 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={filteredSessions.length === 0}>{t("settings.sessions.deleteAll")}</button>

                {filteredSessions.length > 0 ? (
                    <>
                        <span
                            className="my-3 text-[#4C4C4C] dark:text-[#B8BAF2] mt-3 pt-3 border-t border-t-[#CFD0D4] dark:border-t-[#2F384E20]">{t("settings.sessions.count", {count: filteredSessions.length})}</span>

                        <div className="no-scrollbar flex max-h-[400px] flex-col gap-3 overflow-auto">
                            {filteredSessions.map((session) => (
                                <SessionItem
                                    key={session.id}
                                    {...session}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div
                        className="flex h-full flex-col items-center justify-center mt-5 pt-5 border-t border-t-[#CFD0D4] dark:border-t-[#2F384E20]">
                        <span
                            className="text-center text-[#303030] dark:text-[#B8BAF2]">{t("settings.sessions.empty")}</span>
                    </div>
                )}
            </div>
        </>
    );
};
