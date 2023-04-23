import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";
import { WebSocketProvider } from "@/hoc/WebSocketProvider";
import { getCurrentUser } from "@/stores/slices/user/user";
import { getUserDialogs } from "@/stores/slices/dialogs/dialogs";
import { SmoothSpawn } from "@/components/layouts/extra/SmoothSpawn";
import { Loader } from "@/components/ui/messenger/Loader";

/**
 * Wraps the application in protected route component, which checks if the user is logged in and redirects to the login page if not.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ProtectedRoute: FC<ChildrenProps> = ({ children }) => {
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentUser())
            .unwrap()
            .then(() => {
                navigate("/m");
            })
            .catch(() => {
                navigate("/m/login");
            })
            .finally(() => setIsFetching(false));
        dispatch(getUserDialogs());
    }, [dispatch, navigate]);

    if (isFetching) {
        return (
            <SmoothSpawn>
                <Loader className="mx-auto h-[40px] w-[40px]" />
            </SmoothSpawn>
        );
    }

    return <WebSocketProvider>{children}</WebSocketProvider>;
};
