import { ISession } from "@/entities";
import { FC, useState } from "react";
import { useActionCreators } from "@/stores/hooks";
import { userActions } from "@/stores/slices/user/user";
import { useWebSocket } from "@/hoc/WebSocketProvider";
import { CloseIcon, GlobeIcon, MonitorIcon } from "@/components/icons";
import { DeleteSessionModal } from "@/components/settings/pages/sessions/modals/DeleteSessionModal";
import { parseDateToTime } from "@/helpers/helpers";

/**
 * Props for the {@link SessionItem} component.
 *
 * @interface SessionItemProps
 *
 * @extends {ISession}
 *
 * @property {boolean} canDelete - The flag to show the delete button.
 */
interface SessionItemProps extends ISession {
    canDelete?: boolean;
}

/**
 * Session item component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SessionItem: FC<SessionItemProps> = ({
    id,
    location,
    label,
    type,
    ipAddress,
    createdAt,
    canDelete = true,
}) => {
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

    const userStore = useActionCreators(userActions);

    const { destroySession } = useWebSocket();

    /**
     * Checks if the session is a desktop session.
     */
    const isDesktop = (): boolean => {
        return type.localeCompare("desktop") === 0;
    };

    /**
     * Returns the icon for the session depending on the session type.
     */
    const Icon = (): JSX.Element => {
        if (isDesktop()) {
            return <MonitorIcon className="h-10 w-10 stroke-2" />;
        }

        return <GlobeIcon className="h-10 w-10 stroke-2" />;
    };

    /**
     * Destroys the session.
     */
    const destroySessionHandler = (): void => {
        destroySession(id);
        setIsDeleteModalOpened(false);

        userStore.deleteSession({ sessionId: id });
    };

    return (
        <>
            <DeleteSessionModal
                onConfirm={destroySessionHandler}
                isOpened={isDeleteModalOpened}
                onClose={() => setIsDeleteModalOpened(false)}
            />

            <div className="flex items-center gap-3 rounded-lg bg-[#98BDE7] p-3 dark:bg-[#1F2B49]">
                <Icon />

                <div className="flex flex-1 flex-col justify-between gap-0.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="capitalize">{type.toLowerCase()}</span>
                            {canDelete && (
                                <span className="my-auto select-none text-xs text-[#888888] dark:text-[#E3E3FA70]">
                                    {ipAddress}
                                </span>
                            )}
                        </div>

                        {canDelete && (
                            <button
                                className="rounded-full p-0.5 outline-none transition-colors hover:bg-[#5B9BD965] dark:hover:bg-[#416D9C50]"
                                onClick={() => setIsDeleteModalOpened(true)}
                            >
                                <CloseIcon className="h-5 w-5 stroke-[1.5]" />
                            </button>
                        )}
                    </div>

                    <span className="text-sm dark:text-[#E3E3FA70]">{label}</span>

                    <div className="flex items-center gap-1">
                        <span className="select-none text-xs text-[#888888] dark:text-[#E3E3FA40]">{location}</span>

                        <span className="text-xs text-[#888888] dark:text-[#E3E3FA40]">|</span>

                        <span className="select-none text-xs text-[#888888] dark:text-[#E3E3FA40]">
                            {parseDateToTime(createdAt.toString())}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
