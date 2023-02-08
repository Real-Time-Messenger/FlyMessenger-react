import { FC } from "react";
import { useTranslation } from "react-i18next";
import {ModalProps} from "../../../../../interfaces/components/ModalProps";
import { Modal } from "../../../../ui/Modal";
import useKeyPress from "../../../../../hooks/useKeyPress";

interface SessionDeleteModalProps extends ModalProps {
	onConfirm: (id: string) => void;
}

export const SessionDeleteModal: FC<SessionDeleteModalProps> = ({ isOpened, onClose, onConfirm }: SessionDeleteModalProps) => {
	const { t } = useTranslation();

	useKeyPress("Escape", onClose)

	return (
		<Modal
			isOpened={isOpened}
			onClose={onClose}
		>
			<Modal.Title>{t("settings.sessions.delete.title")}</Modal.Title>
			<Modal.Footer>
				<Modal.Button
					label={t("button.cancel")}
					className="bg-[#CAD5F2] text-[#4C4C4C] hover:bg-[#B8BAF2] dark:bg-[#B8BAF210] dark:text-[#B8BAF2] dark:hover:bg-[#B8BAF230]"
				/>
				<Modal.Button
					onSubmit={onConfirm}
					label={t("button.delete")}
					className="bg-[#E86C6C70] text-[#4C4C4C] hover:bg-[#E88383] dark:bg-[#E86C6C10] dark:text-[#E86C6C] dark:hover:bg-[#E86C6C30]"
				/>
			</Modal.Footer>
		</Modal>
	);
};
