import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {IBlockedUser} from "../../../../entities/IBlockedUser";
import { BlockedUserItem } from "../../items";
import {useAppDispatch, useStateSelector} from "../../../../stores/hooks";
import {getUserBlacklist} from "../../../../stores/slices/user/user";
import {Loader} from "../../../ui/Loader";

export const BlockedUsersPage: FC = () => {
	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const blacklist = useStateSelector((state) => state.user.current.blacklist);

	const dispatch = useAppDispatch();

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
				<span className="text-center text-[#303030] dark:text-[#B8BAF2]">{t("settings.blockedUsers.empty")}</span>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="my-5 flex h-full flex-col items-center justify-center">
				<Loader className="w-10 h-10" />
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
					<BlockedUserItem
						key={user.id}
						{...user}
					/>
				))}
			</div>
		</div>
	);
};
