import { FC } from "react";
import { useTranslation } from "react-i18next";
import {ModalProps} from "../../../../../interfaces/components/ModalProps";
import {useAppDispatch, useStateSelector} from "../../../../../stores/hooks";
import { Dropdown } from "../../../../ui/Dropdown";
import { RatioButton } from "../../../../ui/ReatioButton";
import {updateUser} from "../../../../../stores/slices/user/user";

export const LastActivityModeDropdown: FC<ModalProps> = ({ isOpened, onClose }: ModalProps) => {
	const { t } = useTranslation();

	const settings = useStateSelector((state) => state.user.current.settings)
	const isEnabled = settings.lastActivityMode;

	const dispatch = useAppDispatch();

	/**
	 * Updates the current User `lastActivityMode` setting.
	 *
	 * @param {boolean} state - New value.
	 */
	const handleLastActivityModeChange = async (state: boolean): Promise<void> => {
		if (state === isEnabled) return;

		// await UserController.update({ lastActivityMode: state });
		dispatch(updateUser({ lastActivityMode: state }));
	};

	return (
		<Dropdown
			isOpened={isOpened}
			onClose={onClose}
			className="-right-16 top-0"
		>
			<Dropdown.Item>
				<RatioButton
					value={+isEnabled}
					id="lastActivityMode"
					label={t("global.everyone")}
					isSelected={isEnabled}
					changed={() => handleLastActivityModeChange(true)}
				/>
			</Dropdown.Item>

			<Dropdown.Item>
				<RatioButton
					value={+!isEnabled}
					id="lastActivityMode"
					label={t("global.no-one")}
					isSelected={!isEnabled}
					changed={() => handleLastActivityModeChange(false)}
				/>
			</Dropdown.Item>
		</Dropdown>
	);
};
