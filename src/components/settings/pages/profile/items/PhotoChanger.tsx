import { ChangeEvent, createRef, FC } from "react";
import { useTranslation } from "react-i18next";
import {useAppDispatch, useStateSelector} from "../../../../../stores/hooks";
import { CameraIcon } from "../../../../icons";
import { Avatar } from "../../../../ui/Avatar";
import {updateAvatar, updateUser} from "../../../../../stores/slices/user/user";

export const PhotoChanger: FC = () => {
	const photoURL = useStateSelector((state) => state.user.current.photoURL)
	const fileRef = createRef<HTMLInputElement>();
	const dispatch = useAppDispatch();

	/**
	 * Simulates click on File Input.
	 */
	const openFileDialog = (): void => {
		if (!fileRef.current) return;

		fileRef.current.click();
	};

	/**
	 * Updates the current User's Avatar.
	 *
	 * @param {ChangeEvent<HTMLInputElement>} event - Event from File Input.
	 */
	const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (!event.target.files || !event.target.files[0]) return;

		const formData = new FormData();
		formData.append("file", event.target.files[0]);

		dispatch(updateAvatar(formData))
	};

	return (
		<div
			className="relative cursor-pointer"
			onClick={openFileDialog}
		>
			<Avatar
				src={photoURL}
				alt={photoURL}
				className="rounded-full w-[100px] h-[100px]"
			/>

			<div className="absolute bottom-0 right-0 translate-x-1/4 rounded-full border-2 border-[#EAEDFA] bg-[#70A7DD] p-2 dark:border-[#10182B] dark:bg-[#457BA9]">
				<CameraIcon className="h-6 w-6 stroke-[1.5]" />
			</div>

			<input
				ref={fileRef}
				type="file"
				accept="image/png, image/jpeg"
				className="hidden"
				onChange={handleAvatarChange}
			/>
		</div>
	);
};
