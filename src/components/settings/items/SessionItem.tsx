import { SessionDeleteModal } from "../pages/sessions/modals/SessionDeleteModal";
import { FC, useState } from "react";
import {CloseIcon, GlobeIcon, MonitorIcon } from "../../icons";
import {ISession} from "../../../entities";
import {parseDateToTime} from "../../../helpers/helpers";
import {useWebSocket} from "../../../hooks/useWebSocket";

interface SessionItemProps extends ISession {
	canDelete?: boolean
}

export const SessionItem: FC<SessionItemProps> = ({ id, location, label, type, createdAt, canDelete = true }: SessionItemProps) => {
	const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

	// const {destroySession} = useWebSocket();
	const destroySession = (id: string) => {}

	const isDesktop = () => {
		return type.localeCompare("desktop") === 0;
	};

	const Icon = () => {
		if (isDesktop()) {
			return <MonitorIcon className="h-10 w-10 stroke-2" />;
		}

		return <GlobeIcon className="h-10 w-10 stroke-2" />;
	};

	return (
		<>
			<SessionDeleteModal
				onConfirm={() => destroySession(id)}
				isOpened={isDeleteModalOpened}
				onClose={() => setIsDeleteModalOpened(false)}
			/>

			<div className="flex items-center gap-3 rounded-lg bg-[#98BDE7] p-3 dark:bg-[#1F2B49]">
				<Icon />

				<div className="flex flex-1 flex-col justify-between gap-0.5">
					<div className="flex items-center justify-between">
						<span className="capitalize">{type.toLowerCase()}</span>

						{canDelete && (
							<button
								className="duration-250 rounded-full p-0.5 outline-none transition-colors hover:bg-[#5B9BD965] dark:hover:bg-[#416D9C50]"
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

						<span className="select-none text-xs text-[#888888] dark:text-[#E3E3FA40]">{parseDateToTime(createdAt.toString())}</span>
					</div>
				</div>
			</div>
		</>
	);
};
