/**
 * Props for the {@link Modal} component.
 *
 * @interface ModalProps
 *
 * @property {boolean} isOpened - Whether the modal is currently opened or not.
 * @property {function} onClose - The handler to call when the modal is closed.
 */
export interface ModalProps {
    isOpened: boolean;
    onClose: () => void;
    zIndex?: number;
}
