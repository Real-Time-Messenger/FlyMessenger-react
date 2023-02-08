import { useTranslation } from "react-i18next";
import {ModalProps} from "../../../interfaces/components/ModalProps";
import { Modal } from "../../ui/Modal";

interface DeleteDialogModalProps extends ModalProps {
	id: string;
}

export const DeleteDialogModal = ({ isOpened, onClose, id }: DeleteDialogModalProps) => {
	const { t } = useTranslation();

	const deleteDialog = async () => {
		// await DialogController.delete(id);
	};

	return (
		<Modal
			isOpened={isOpened}
			onClose={onClose}
		>
			<Modal.Title>{t("dialog.modal.delete.title")}</Modal.Title>
			<Modal.Footer>
				<Modal.Button label={t("button.cancel")} />
				<Modal.Button
					onSubmit={deleteDialog}
					label={t("button.delete")}
					variant="danger"
				/>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteDialogModal;
