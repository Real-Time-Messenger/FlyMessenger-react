import { createContext, FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { IAPIError, IResponseValidationError } from "@/interfaces/response/error";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/stores/slices/user/user";
import { SmoothSpawn } from "@/components/layouts/extra/SmoothSpawn";
import { Loader } from "@/components/ui/messenger/Loader";
import { ThemeToggler } from "@/components/ui/auth/ThemeToggler";
import { LanguageToggler } from "@/components/ui/auth/LanguageToggler";
import { LogoIcon } from "@/components/icons";
import { useDocumentTitle } from "@/hooks";

/**
 * Interface for handling the `onSubmit` event.
 *
 * @interface OnSubmitEvent
 *
 * @property {(event: FormEvent<HTMLFormElement>) => void} [onSubmit] - `onSubmit` event handler.
 */
interface OnSubmitEvent {
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

/**
 * Interface for the {@link AuthLayout} component.
 *
 * @interface AuthLayoutProps
 *
 * @extends {@link ChildrenProps}, {@link OnSubmitEvent}
 *
 * @property {string} title - Title of the page.
 * @property {number} [width] - Width of the wrapper.
 */
interface AuthLayoutProps extends ChildrenProps, OnSubmitEvent {
    title: string;
    width?: number;
}

/**
 * Interface for the `error` property of the {@link ResponseError} interface.
 *
 * @interface ResponseError
 *
 * @property {IAPIError | IResponseValidationError | null} error - Error object.
 */
interface ResponseError {
    error: IAPIError | IResponseValidationError | null;
}

/**
 * Interface for the context to share parent props between child components.
 *
 * @interface AuthLayoutContext
 *
 * @extends {@link OnSubmitEvent}
 *
 * @property {boolean} canFetchUser - Whether the user can be fetched.
 */
interface AuthLayoutContext extends OnSubmitEvent {
    canFetchUser: boolean;
}

/**
 * Create context to share parent props between child components.
 */
const AuthLayoutContext = createContext<AuthLayoutContext>({
    onSubmit: () => {},
    canFetchUser: true,
});

/**
 * Main layout for auth pages (login, register, forgot password and etc.).
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const AuthLayout = ({ children, onSubmit, title, width = 400 }: AuthLayoutProps) => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const loading = useStateSelector((state) => state.user.loading);
    const dispatch = useAppDispatch();

    const currentUserId = useStateSelector((state) => state.user.current.id);
    const navigate = useNavigate();

    const authContext = useContext(AuthLayoutContext);

    /**
     * Send request to the server to check if the user exists.
     */
    const checkIfUserExist = useCallback((): void => {
        if (currentUserId) {
            navigate("/m");
        }

        if (!authContext.canFetchUser) {
            setIsFetching(false);
            return;
        }

        setIsFetching(true);

        dispatch(getCurrentUser())
            .unwrap()
            .then(() => navigate("/m"))
            .catch(() => (authContext.canFetchUser = false))
            .finally(() => setIsFetching(false));
    }, [authContext, currentUserId, dispatch, navigate]);

    useDocumentTitle(`${title} | Fly Messenger`);

    useEffect(() => {
        checkIfUserExist();
    }, [checkIfUserExist]);

    if (loading === "pending" || isFetching) {
        return (
            <SmoothSpawn>
                <Loader className="mx-auto h-[40px] w-[40px]" />
            </SmoothSpawn>
        );
    }

    return (
        <div>
            <div className="absolute top-4 right-4 flex items-center justify-center gap-3">
                <ThemeToggler />
                <LanguageToggler />
            </div>

            <SmoothSpawn width={width}>
                <div className="flex flex-col rounded bg-white px-[35px] py-2.5 transition-colors dark:bg-[#151F38]">
                    <AuthLayoutContext.Provider value={{ onSubmit, canFetchUser: false }}>
                        {children}
                    </AuthLayoutContext.Provider>
                </div>
            </SmoothSpawn>
        </div>
    );
};

/**
 * Wrapper for the form.
 */
const Form = ({ children }: ChildrenProps) => {
    const { onSubmit } = useContext(AuthLayoutContext);

    /**
     * Handle the `onSubmit` event.
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onSubmit?.(event);
    };

    return <form onSubmit={handleSubmit}>{children}</form>;
};

/**
 * Wrapper for the header.
 */
const Header = ({ children }: ChildrenProps) => {
    return (
        <div className="mx-auto mt-2.5 flex select-none flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2.5 text-[#161616] transition-colors dark:text-[#E3E3FA]">
                <LogoIcon className="h-[28px] w-[28px] stroke-[1.5]" />
                <span className="text-lg">Fly Messenger</span>
            </div>

            {children}
        </div>
    );
};

/**
 * Wrapper for the title.
 */
const Title = ({ children }: ChildrenProps) => {
    return <span className="text-center text-2xl transition-colors dark:text-white">{children}</span>;
};

/**
 * Wrapper for the description.
 */
const Description = ({ children }: ChildrenProps) => {
    return <span className="text-sm text-[#161616] transition-colors dark:text-[#AFAFAF]">{children}</span>;
};

/**
 * Wrapper for the body.
 */
const Body = ({ children }: ChildrenProps) => {
    return <div className="mt-8 flex flex-col gap-8">{children}</div>;
};

/**
 * Wrapper for the exception message.
 */
const ErrorBoundary = ({ error }: ResponseError) => {
    const { t } = useTranslation();

    const isValidationError = error && "details" in error && error.details[0].field === "__root__";
    const isAPIError = error && "message" in error;

    if (!error) return null;
    return (
        <div className="mt-2 text-center text-sm text-[#E86C6C] transition-colors dark:text-[#E86C6C]">
            {/* INFO: This is an error only for `__root__` field. */}
            {isValidationError &&
                ((error.details[0].translation && t(`validation.errors.${error.details[0].translation}`)) ||
                    error.details[0].message)}

            {isAPIError && ((error.translation && t(`errors.${error.translation}`)) || error.message)}
        </div>
    );
};

/**
 * Wrapper for the button's container.
 */
const Buttons = ({ children }: ChildrenProps) => {
    return <div className="mt-6 mb-2.5 flex flex-col gap-3">{children}</div>;
};

/**
 * Wrapper for the additional link's container.
 */
const AdditionalLinks = ({ children }: ChildrenProps) => {
    return <div className="mt-2.5 flex items-center justify-center gap-2.5">{children}</div>;
};

AuthLayout.Form = Form;
AuthLayout.Header = Header;
AuthLayout.Title = Title;
AuthLayout.Description = Description;
AuthLayout.Body = Body;
AuthLayout.ErrorBoundary = ErrorBoundary;
AuthLayout.Buttons = Buttons;
AuthLayout.AdditionalLinks = AdditionalLinks;
