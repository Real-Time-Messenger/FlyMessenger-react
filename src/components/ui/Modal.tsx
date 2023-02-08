import {
    ButtonHTMLAttributes,
    createContext,
    DetailedHTMLProps,
    Dispatch, FC, ForwardedRef, forwardRef, ForwardRefExoticComponent,
    InputHTMLAttributes, MutableRefObject, PropsWithoutRef, RefAttributes,
    MouseEvent,
    SetStateAction, useCallback, useContext, useEffect, useMemo, useState
} from "react";
import {ChildrenProps} from "../../interfaces/ChildrenProps";
import {ClassNameProps} from "../../interfaces/ClassNameProps";
import {cva, VariantProps} from "class-variance-authority";
import {DarkenedLayout} from "../layout/extra/DarkenedLayout";
import {ModalProps} from "../../interfaces/components/ModalProps";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "./Loader";
import {IResponseValidationError} from "../../interfaces/response/error";
import {useTranslation} from "react-i18next";
import useKeyPress from "../../hooks/useKeyPress";

/**
 * Interface for the `Modal.Content` section.
 */
interface ModelContentProps extends ChildrenProps {
    errorBoundary?: {
        error: IResponseValidationError | undefined;
        setError: Dispatch<SetStateAction<IResponseValidationError | undefined>>;
    };
}

/**
 * Interface for the `Modal.Input` component.
 */
interface ModalInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
}

/**
 * Interface for the `Modal.Button` component.
 */
interface ModalButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ClassNameProps, VariantProps<typeof itemCva> {
    label: string;
    onSubmit?: (args?: any) => void;
}

/**
 * Interface for the `Modal.Footer` section.
 */
interface ModalFooterProps extends ChildrenProps {
    position?: "left" | "right" | "center";
}

/**
 * Error Context for the `Modal` component, to Share `Modal`
 * Response Validation Error between Child Components.
 */
const ResponseValidationErrorContext = createContext({
    error: {} as IResponseValidationError | undefined,
    setError: {} as Dispatch<SetStateAction<IResponseValidationError | undefined>>,
});

/**
 * Context for the `Modal` component, to Share `Modal` states between Child Components.
 */
const ModalContext = createContext({
    isOpened: false,
    onClose: () => {
    },
});

export const Modal = ({isOpened, children, onClose}: ModalProps & ChildrenProps) => {
    useKeyPress("Escape", onClose);

    return (
        <DarkenedLayout isDarkened={isOpened} zIndex={3}>
            <ModalContext.Provider value={{isOpened, onClose}}>
                <AnimatePresence mode="wait" key="modal-item">
                    {isOpened && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                            className="modal-item w-[300px] rounded-lg bg-[#EAEDFA] p-2 text-center dark:bg-[#10182B]">
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </ModalContext.Provider>
        </DarkenedLayout>
    );
};

const Title: FC<ChildrenProps> = ({children}: ChildrenProps) => (
    <div className="mx-auto flex w-[250px] items-center justify-center">
        <span className="text-lg text-[#303030] dark:text-[#E3E3FA]">{children}</span>
    </div>
);

const Content: FC<ModelContentProps> = ({
                                            children,
                                            errorBoundary = {
                                                error: undefined,
                                                setError: () => {
                                                },
                                            },
                                        }: ModelContentProps) => {
    return (
        <ResponseValidationErrorContext.Provider
            value={{
                error: errorBoundary.error,
                setError: errorBoundary.setError,
            }}
        >
            <div className="mt-4 flex flex-col gap-2.5">{children}</div>
        </ResponseValidationErrorContext.Provider>
    );
};

const Input: ForwardRefExoticComponent<PropsWithoutRef<ModalInputProps> & RefAttributes<HTMLInputElement>> = forwardRef((props: ModalInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {t} = useTranslation();

    const {isOpened} = useContext(ModalContext);
    const {error, setError} = useContext(ResponseValidationErrorContext);

    const isError = useMemo(() => {
        if (error) {
            return error.details.some((field) => field.field === props.name);
        }
        return false;
    }, [error]);

    const classes = classNames("w-full p-1 bg-transparent outline-none border-b-2 transition-colors duration-250 text-sm", isError ? "border-b-red-500 dark:border-b-red-600/50 focus:border-b-red-500 dark:focus:border-b-red-500" : "border-b-[#696969] dark:border-b-[#64698F] focus:dark:border-b-[#B8BAF2]");

    useEffect(() => {
        if (!isOpened) {
            setTimeout(() => {
                if ((ref as MutableRefObject<HTMLInputElement>)?.current) {
                    (ref as MutableRefObject<HTMLInputElement>).current.value = (ref as MutableRefObject<HTMLInputElement>).current?.defaultValue;
                }

                if (error) {
                    setError(undefined);
                }
            }, 200);
        }
    }, [error, isOpened, ref, setError]);

    return (
        <div className="flex w-full flex-col">
            <label className="px-1 text-left text-sm">{props.label}</label>

            <input
                {...props}
                ref={ref}
                className={classes}
                autoComplete="off"
            />

            {isError && <span
                className="mt-1 select-none text-left text-xs font-medium text-red-500">{t(`validation.errors.${error?.details.find((detail) => detail.field === props.name)?.translation}`)}</span>}
        </div>
    );
});

const itemCva = cva("", {
    variants: {
        variant: {
            primary: "bg-[#CAD5F2] text-[#4C4C4C] hover:bg-[#B8BAF2] dark:bg-[#B8BAF210] dark:text-[#B8BAF2] dark:hover:bg-[#B8BAF230]",
            danger: "bg-[#EFCBCF] text-[#E86C6C] hover:bg-[#E86C6C] hover:text-white dark:bg-[#E86C6C10] dark:text-[#E86C6C] dark:hover:bg-[#E86C6C30]",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

const Button: FC<ModalButtonProps> = ({className, variant, label, onSubmit, ...props}: ModalButtonProps) => {
    const {onClose} = useContext(ModalContext);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    /**
     * Toggles the `isSubmitting` state.
     */
    const handleSubmit = useCallback(() => {
        if (!onSubmit) return;

        setIsSubmitting(true);
        onSubmit();
        setIsSubmitting(false);
    }, [onSubmit]);

    /**
     * Handles the `onClick` event.
     */
    const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (onSubmit || isSubmitting) handleSubmit();
            if (onClose && !onSubmit) onClose();
            if (props.onClick) props.onClick(e);
        },
        [onSubmit, isSubmitting, handleSubmit, onClose],
    );

    const classes = classNames("min-w-[70px] px-2 py-1 rounded-md outline-none text-sm transition-colors duration-250", className, itemCva({variant}));

    return (
        <button
            disabled={isSubmitting}
            className={classes}
            onClick={(e) => handleClick(e)}
            {...props}
        >
            <AnimatePresence>
                {isSubmitting ? (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25}}
                    >
                        <Loader className="h-4 w-4 mx-auto"/>
                    </motion.div>
                ) : (
                    <motion.span
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25}}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};

const Footer: FC<ModalFooterProps> = ({children, position = "center"}: ModalFooterProps) => {
    const classes = classNames("flex gap-2.5 mt-2", position === "left" && "justify-start", position === "center" && "justify-center", position === "right" && "justify-end");

    return <div className={classes}>{children}</div>;
};

Modal.Title = Title;
Modal.Content = Content;
Modal.Input = Input;
Modal.Button = Button;
Modal.Footer = Footer;
