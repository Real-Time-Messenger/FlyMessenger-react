import { FC } from "react";
import { useTranslation } from "react-i18next";
import {IBlockedUser} from "../../../entities/IBlockedUser";
import {Avatar} from "../../ui/Avatar";
import {concatenate} from "../../../helpers/helpers";
import {useActionsCreators, useAppDispatch} from "../../../stores/hooks";
import {blockOrUnblockUser} from "../../../stores/slices/user/user";
import {dialogsActions} from "../../../stores/slices/dialogs/dialogs";

export const BlockedUserItem: FC<IBlockedUser> = ({ id, username, firstName, lastName, photoURL }: IBlockedUser) => {
	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const dialogStore = useActionsCreators(dialogsActions);

	const pardonUser = async () => {
		dispatch(blockOrUnblockUser({blacklistedUserId: id}))
			.unwrap()
			.then(() => dialogStore.blockUser({userId: id, isBlocked: false}));
	};

	return (
		<div className="flex items-center gap-3 rounded-lg bg-[#98BDE7] p-3 dark:bg-[#1F2B49]">
			<Avatar
				src={photoURL}
				alt={username}
				className="rounded-full w-10 h-10"
			/>

			<div className="flex flex-1 flex-col justify-between">
				<span>
					{concatenate(firstName, lastName)}
				</span>

				<span className="select-none text-xs text-[#4C4C4C] dark:text-[#40465A]">@{username}</span>
			</div>

			<div className="flex items-center">
				<span
					className="cursor-pointer truncate text-sm text-[#1D4ED8] hover:underline dark:text-[#4C70E0]"
					onClick={pardonUser}
				>
					{t("users.unblock")}
				</span>
			</div>
		</div>
	);
};
