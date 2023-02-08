import {ChildrenProps} from "../../../../interfaces/ChildrenProps";
import {createContext, FormEvent, useCallback, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IAPIError, IResponseValidationError} from "../../../../interfaces/response/error";
import {useAppDispatch, useStateSelector} from "../../../../stores/hooks";
import {useTranslation} from "react-i18next";
import {Loader} from "../../../ui/Loader";
import {LogoIcon} from "../../../icons";
import {SmoothSpawn} from "./SmoothSpawn";
import {LanguageToggler} from "../items/LanguageToggler";
import {ThemeToggler} from "../items/ThemeToggler";
import {getCurrentUser} from "../../../../stores/slices/user/user";

interface OnSubmitEvent {
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

interface AuthLayoutProps extends ChildrenProps, OnSubmitEvent {
    width?: number;
    title: string;
}

interface ResponseError {
    error: IAPIError | IResponseValidationError | null;
}

interface AuthLayoutContext extends OnSubmitEvent {
    canFetchUser: boolean;
}

/**
 * Create context to share parent props between child components.
 */
const AuthLayoutContext = createContext<AuthLayoutContext>({
    onSubmit: () => {
    },
    canFetchUser: true
});

/**
 * Main layout for auth pages (login, register, forgot password).
 */
export const AuthLayout = ({children, onSubmit, title, width = 400}: AuthLayoutProps) => {
    const {t} = useTranslation();

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const loading = useStateSelector((state) => state.user.loading);
    const dispatch = useAppDispatch();

    const currentUserId = useStateSelector((state) => state.user.current.id);
    const navigate = useNavigate();

    const authContext = useContext(AuthLayoutContext);

    const checkIfUserExist = useCallback(async () => {
        setIsFetching(true);

        if (currentUserId) {
            navigate("/m");
        }

        if (!authContext.canFetchUser) {
            setIsFetching(false);
            return;
        }

        dispatch(getCurrentUser())
            .unwrap()
            .then(() => navigate("/m"))
            .catch(() => authContext.canFetchUser = false)
            .finally(() => setIsFetching(false));
    }, [navigate]);

    useEffect(() => {
        checkIfUserExist();
    }, [checkIfUserExist]);

    useEffect(() => {
        document.title = `${title} | Fly Messenger`;
    }, [title]);

    if (loading === "pending" || isFetching) {
        return (
            <SmoothSpawn>
                <Loader className="mx-auto h-[40px] w-[40px]"/>
            </SmoothSpawn>
        );
    }

    return (
        <div>
            <div className="absolute top-4 right-4 flex items-center justify-center gap-3">
                <ThemeToggler/>
                <LanguageToggler/>
            </div>

            <SmoothSpawn width={width}>
                <div
                    className="duration-250 flex flex-col rounded bg-white px-[35px] py-2.5 transition-colors dark:bg-[#151F38]">
                    <AuthLayoutContext.Provider
                        value={{onSubmit, canFetchUser: false}}>{children}</AuthLayoutContext.Provider>
                </div>
            </SmoothSpawn>
        </div>
    );
};

const Form = ({children}: ChildrenProps) => {
    const {onSubmit} = useContext(AuthLayoutContext);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (onSubmit) {
            event.preventDefault();

            onSubmit(event);
        }
    };

    return <form onSubmit={handleSubmit}>{children}</form>;
};

const Header = ({children}: ChildrenProps) => {
    return (
        <div className="mx-auto mt-2.5 flex select-none flex-col items-center justify-center gap-3">
            <div
                className="duration-250 flex items-center gap-2.5 text-[#161616] transition-colors dark:text-[#E3E3FA]">
                <LogoIcon className="h-[28px] w-[28px] stroke-[1.5]"/>
                <span className="text-lg">Fly Messenger</span>
            </div>

            {children}
        </div>
    );
};

const Title = ({children}: ChildrenProps) => {
    return <span className="duration-250 text-center text-2xl transition-colors dark:text-white">{children}</span>;
};

const Description = ({children}: ChildrenProps) => {
    return <span
        className="duration-250 text-sm text-[#161616] transition-colors dark:text-[#AFAFAF]">{children}</span>;
};

const Body = ({children}: ChildrenProps) => {
    return <div className="mt-8 flex flex-col gap-8">{children}</div>;
};

const ErrorBoundary = ({error}: ResponseError) => {
    const {t} = useTranslation();

    const isValidationError = error && "details" in error && error.details[0].field === "__root__";
    const isAPIError = error && "message" in error;

    if (!error) return null;
    return (
        <div className="duration-250 mt-2 text-center text-sm text-[#E86C6C] transition-colors dark:text-[#E86C6C]">
            {/* WARNING: This is a error only for `__root__` field. */}
            {isValidationError && ((error.details[0].translation && t(`validation.errors.${error.details[0].translation}`)) || error.details[0].message)}

            {isAPIError && ((error.translation && t(`errors.${error.translation}`)) || error.message)}
        </div>
    );
};

const Buttons = ({children}: ChildrenProps) => {
    return <div className="mt-6 mb-2.5 flex flex-col gap-3">{children}</div>;
};

const AdditionalLinks = ({children}: ChildrenProps) => {
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

function userStateSelector(arg0: (state: any) => any) {
    throw new Error("Function not implemented.");
}

