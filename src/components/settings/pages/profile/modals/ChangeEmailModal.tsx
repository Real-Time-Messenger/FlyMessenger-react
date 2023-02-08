import { t } from "i18next";
import { FC, createRef, useState } from "react";
import { Modal } from "../../../../ui/Modal";
import {ModalProps} from "../../../../../interfaces/components/ModalProps";
import {useAppDispatch, useStateSelector} from "../../../../../stores/hooks";
import {IResponseValidationError} from "../../../../../interfaces/response/error";
import {updateUser} from "../../../../../stores/slices/user/user";

export const ChangeEmailModal: FC<ModalProps> = ({ isOpened, onClose }: ModalProps) => {
	const email = useStateSelector((state) => state.user.current.email)

	const emailRef = createRef<HTMLInputElement>();
	const [error, setError] = useState<IResponseValidationError>();

	const dispatch = useAppDispatch();

	/**
	 * Handler for Modal Submit Event.
	 */
	const onSubmit = (): void => {
		if (!emailRef.current) return;

		dispatch(updateUser({email: emailRef.current.value}))
			.unwrap()
			.then(() => onClose())
			.catch((e) => setError(e));
	};

	return (
		<Modal
			isOpened={isOpened}
			onClose={onClose}
		>
			<Modal.Title>{t("settings.profile.modal.email.title")}</Modal.Title>

			<Modal.Content errorBoundary={{ error, setError }}>
				<Modal.Input
					name="email"
					label={t("users.email")}
					placeholder={t("users.email").toString()}
					defaultValue={email}
					ref={emailRef}
					maxLength={255}
					pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
					type="email"
				/>
			</Modal.Content>

			<Modal.Footer>
				<Modal.Button label={t("button.cancel")} />
				<Modal.Button
					variant="danger"
					label={t("button.save")}
					onSubmit={onSubmit}
				/>
			</Modal.Footer>
		</Modal>
	);
};
