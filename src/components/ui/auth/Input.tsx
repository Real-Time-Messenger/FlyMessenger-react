import classNames from "classnames";
import { t } from "i18next";
import { createRef, FC, InputHTMLAttributes, useState } from "react";
import { IResponseValidationError } from "@/interfaces/response/error";
import { EyeIcon, EyeSlashIcon } from "../../icons";

/**
 * Props for the {@link AuthInput} component.
 *
 * @interface AuthInputProps
 *
 * @extends InputHTMLAttributes<HTMLInputElement>
 *
 * @property {string} label - The label for the input.
 * @property {IResponseValidationError | null} errorBoundary - The error boundary for the input.
 * @property {boolean} canBeVisible - Whether the input can be visible or not.
 */
interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorBoundary?: IResponseValidationError | null;
    canBeVisible?: boolean;
}

/**
 * Get the error by the `field` key from the API error object.
 *
 * @param {IResponseValidationError} error - The error object from the API.
 * @param {string} field - The field key to get the error for.
 *
 * @returns {string | null} - The error message or `null` if the error is not found.
 */
const getErrorByField = (error: IResponseValidationError, field: string): string | null => {
    const errorObj = error.details?.find((detail) => detail.field === field);
    if (!errorObj) return null;

    return errorObj.translation ? t(`validation.errors.${errorObj.translation}`) : errorObj.message;
};

const passwordConfirmNames = ["password", "passwordConfirm"];

/**
 * Input component for the authentication forms.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const Input: FC<AuthInputProps> = ({ label, type, errorBoundary, className, canBeVisible = true, ...props }) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

    const ref = createRef<HTMLInputElement>();

    const inputType = type || "text";
    const isPassword = props.name === "password";

    /**
     * Toggle the password visibility by clicking the eye icon.
     */
    const togglePasswordVisibility = (): void => {
        if (!ref.current || !canBeVisible) return;
        const parent = ref.current.parentElement;
        if (!parent) return;

        setIsPasswordHidden(!isPasswordHidden);

        // Get all inputs in the parent element to toggle their type.
        parent.querySelectorAll("input").forEach((input) => {
            if (!passwordConfirmNames.includes(input.name)) return;

            input.type = isPasswordHidden ? "text" : "password";
        });
    };

    return (
        <div className="relative flex flex-col" ref={ref}>
            <label
                htmlFor={props.id}
                className="select-none text-sm text-[#3F3F3F] transition-colors dark:text-[#A6A6A6]"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    type={isPasswordHidden ? inputType : "text"}
                    className={classNames(
                        "w-full border-b-2 bg-white py-2.5 text-[#161616] outline-none transition-colors placeholder:text-[#69696990] dark:bg-[#151F38] dark:text-[#E3E3FA] dark:placeholder:text-[#64698F]",
                        errorBoundary && getErrorByField(errorBoundary, props.name || "")
                            ? "border-[#E86C6C75] focus:border-[#E86C6C]"
                            : "border-[#69696950] focus:border-[#3F3F3F]",
                        className,
                    )}
                    {...props}
                />

                {inputType === "password" && canBeVisible && (
                    <button
                        className="absolute right-0 bottom-0 select-none p-2 outline-none"
                        tabIndex={-1}
                        type="button"
                        onClick={togglePasswordVisibility}
                    >
                        {isPassword && (
                            <>
                                {isPasswordHidden ? (
                                    <EyeIcon className="h-6 w-6 stroke-[1.5] text-[#696969] transition-colors dark:text-[#7B7B7B]" />
                                ) : (
                                    <EyeSlashIcon className="h-6 w-6 stroke-[1.5] text-[#696969] transition-colors dark:text-[#7B7B7B]" />
                                )}
                            </>
                        )}
                    </button>
                )}
            </div>

            {errorBoundary && (
                <span
                    className="mt-2 text-sm text-[#E86C6C]"
                    aria-invalid={!!errorBoundary && !!getErrorByField(errorBoundary, props.name || "")}
                >
                    {getErrorByField(errorBoundary, props.name || "")}
                </span>
            )}
        </div>
    );
};
