import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { IResponseValidationError } from "@/interfaces/response/error";
import {
    ButtonHTMLAttributes,
    createContext,
    DetailedHTMLProps,
    Dispatch,
    FC,
    ForwardedRef,
    forwardRef,
    ForwardRefExoticComponent,
    InputHTMLAttributes,
    MouseEvent,
    MutableRefObject,
    PropsWithoutRef,
    RefAttributes,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { cva, VariantProps } from "class-variance-authority";
import { ModalProps } from "@/interfaces/components/ModalProps";
import { useKeyPress } from "@/hooks";
import { DarkenedLayout } from "@/components/layouts/extra/DarkenedLayout";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Loader } from "@/components/ui/messenger/Loader";
import {createPortal} from "react-dom";

/**
 * Interface for the {@link Modal.Content} interface.
 *
 * @property {IResponseValidationError | undefined} error - The response validation error.
 * @property {Dispatch<SetStateAction<IResponseValidationError | undefined>>} setError -
 * The setter for the response validation error.
 */
interface ErrorBoundaryProps {
    error: IResponseValidationError | undefined;
    setError: Dispatch<SetStateAction<IResponseValidationError | undefined>>;
}

/**
 * Props for the {@link Modal} component.
 *
 * @extends ModalProps
 *
 * @property {ErrorBoundaryProps} errorBoundary - The error boundary for the modal.
 */
interface ModalContentProps extends ChildrenProps {
    errorBoundary?: ErrorBoundaryProps;
}

/**
 * Props for the {@link Modal.Header} component.
 *
 * @extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
 *
 * @property {string} label - The label of the modal header.
 */
interface ModalInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
}

/**
 * Props for the {@link Modal.Button} component.
 *
 * @extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
 *
 * @property {string} label - The label of the modal button.
 * @property {() => void} onSubmit - The callback for when the modal button is submitted.
 */
interface ModalButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        ClassNameProps,
        VariantProps<typeof itemCva> {
    label: string;
    onSubmit?: () => void;
}

/**
 * Props for the {@link Modal.Footer} component.
 *
 * @extends ChildrenProps
 *
 * @property {"left" | "right" | "center"} position - The position of the modal footer.
 */
interface ModalFooterProps extends ChildrenProps {
    position?: "left" | "right" | "center";
}

/**
 * Error context for the {@link Modal} component, to share {@link Modal}
 * response validation error between child components.
 */
const ResponseValidationErrorContext = createContext({
    error: {} as IResponseValidationError | undefined,
    setError: {} as Dispatch<SetStateAction<IResponseValidationError | undefined>>,
});

/**
 * Context for the {@link Modal} component, to share {@link Modal} states between child components.
 */
const ModalContext = createContext({
    isOpened: false,
    onClose: () => {},
});

/**
 * Variant of the {@link Input} component for the modal.
 */
const itemCva = cva("", {
    variants: {
        variant: {
            primary:
                "bg-[#CAD5F2] text-[#4C4C4C] hover:bg-[#B8BAF2] dark:bg-[#B8BAF210] dark:text-[#B8BAF2] dark:hover:bg-[#B8BAF230]",
            danger: "bg-[#EFCBCF] text-[#E86C6C] hover:bg-[#E86C6C] hover:text-white dark:bg-[#E86C6C10] dark:text-[#E86C6C] dark:hover:bg-[#E86C6C30]",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

/**
 * Custom modal component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const Modal = ({ isOpened, children, onClose, zIndex = 2 }: ModalProps & ChildrenProps) => {
    useKeyPress("Escape", onClose);

    const Component = useMemo(
        () => (
            <DarkenedLayout isDarkened={isOpened} zIndex={zIndex}>
                <ModalContext.Provider value={{ isOpened, onClose }}>
                    <AnimatePresence mode="wait" key="modal-item">
                        {isOpened && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="modal-item w-[350px] rounded-lg bg-[#EAEDFA] p-4 text-center dark:bg-[#10182B]"
                            >
                                {children}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ModalContext.Provider>
            </DarkenedLayout>
        ),
        [isOpened, children, onClose]
    );

    return createPortal(Component, document.body);
};

/**
 * Renders title of the modal.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
const Title: FC<ChildrenProps> = ({ children }) => (
    <div className="mx-auto flex items-center justify-center">
        <span className="text-lg text-[#303030] dark:text-[#E3E3FA]">{children}</span>
    </div>
);

/**
 * Renders content of the modal.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
const Content: FC<ModalContentProps> = ({ children, errorBoundary }) => {
    return (
        <ResponseValidationErrorContext.Provider
            value={{
                setError: errorBoundary?.setError || (() => {}),
                error: errorBoundary?.error || undefined,
            }}
        >
            <div className="mt-4 flex flex-col gap-2.5">{children}</div>
        </ResponseValidationErrorContext.Provider>
    );
};

/**
 * Input component for the modal.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
const Input: ForwardRefExoticComponent<PropsWithoutRef<ModalInputProps> & RefAttributes<HTMLInputElement>> = forwardRef(
    (props: ModalInputProps, ref: ForwardedRef<HTMLInputElement>) => {
        const { t } = useTranslation();

        const { isOpened } = useContext(ModalContext);
        const { error, setError } = useContext(ResponseValidationErrorContext);

        const isError = useMemo(() => {
            if (error) {
                return error.details.some((field) => field.field === props.name);
            }
            return false;
        }, [error, props.name]);

        const classes = classNames(
            "w-full px-1 py-2 bg-transparent outline-none border-b-2 transition-colors text-[#303030] dark:text-[#E3E3FA]",
            isError
                ? "border-b-red-500 dark:border-b-red-600/50 focus:border-b-red-500 dark:focus:border-b-red-500"
                : "border-b-[#696969] dark:border-b-[#64698F] focus:dark:border-b-[#B8BAF2]",
        );

        useEffect(() => {
            if (!isOpened) {
                setTimeout(() => {
                    if ((ref as MutableRefObject<HTMLInputElement>)?.current) {
                        (ref as MutableRefObject<HTMLInputElement>).current.value = (
                            ref as MutableRefObject<HTMLInputElement>
                        ).current?.defaultValue;
                    }

                    if (error) {
                        setError(undefined);
                    }
                }, 200);
            }
        }, [error, isOpened, ref, setError]);

        return (
            <div className="flex w-full flex-col">
                <label className="px-1 text-left text-sm text-[#303030] dark:text-[#64698F]">{props.label}</label>

                <input {...props} ref={ref} className={classes} autoComplete="off" />

                {isError && (
                    <span className="mt-1 select-none text-left text-xs font-medium text-red-500">
                        {t(
                            `validation.errors.${
                                error?.details.find((detail) => detail.field === props.name)?.translation
                            }`,
                        )}
                    </span>
                )}
            </div>
        );
    },
);

/**
 * Renders buttons of the modal.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
const Button: FC<ModalButtonProps> = ({ className, variant, label, onSubmit, ...props }: ModalButtonProps) => {
    const { onClose } = useContext(ModalContext);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    /**
     * Toggles the `isSubmitting` state.
     */
    const handleSubmit = useCallback((): void => {
        if (!onSubmit) return;

        setIsSubmitting(true);
        onSubmit();
        setIsSubmitting(false);
    }, [onSubmit]);

    /**
     * Handles the `onClick` event.
     */
    const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>): void => {
            if (onSubmit || isSubmitting) handleSubmit();
            if (onClose && !onSubmit) onClose();
            if (props.onClick) props.onClick(e);
        },
        [onSubmit, isSubmitting, handleSubmit, onClose, props],
    );

    const classes = classNames(
        "min-w-[70px] px-3 py-2 rounded-md outline-none text-sm transition-colors",
        className,
        itemCva({ variant }),
    );

    return (
        <button disabled={isSubmitting} className={classes} onClick={(e) => handleClick(e)} {...props}>
            <AnimatePresence>
                {isSubmitting ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Loader className="mx-auto h-4 w-4" />
                    </motion.div>
                ) : (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};

/**
 * Renders footer of the modal.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
const Footer: FC<ModalFooterProps> = ({ children, position = "center" }: ModalFooterProps) => {
    const classes = classNames(
        "flex gap-2.5 mt-4",
        position === "left" && "justify-start",
        position === "center" && "justify-center",
        position === "right" && "justify-end",
    );

    return <div className={classes}>{children}</div>;
};

Modal.Title = Title;
Modal.Content = Content;
Modal.Input = Input;
Modal.Button = Button;
Modal.Footer = Footer;
