import {useNavigate} from "react-router-dom";
import {useAppDispatch, useStateSelector} from "../stores/hooks";
import {ChildrenProps} from "../interfaces/ChildrenProps";
import {useCallback, useEffect, useState} from "react";
import {getCurrentUser} from "../stores/slices/user/user";
import {SmoothSpawn} from "../components/pages/auth/layouts/SmoothSpawn";
import {Loader} from "../components/ui/Loader";
import {getUserDialogs} from "../stores/slices/dialogs/dialogs";
import {useWebSocket, WebSocketProvider} from "./WebSocketProvider";
import {useOnlineStatus} from "../hooks/useOnlineStatus";

export const ProtectedRoute = ({children}: ChildrenProps) => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [socketConnected, setSocketConnected] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const currentUser = useStateSelector((state) => state.user.current);
    const navigate = useNavigate();

    const {connect, toggleOnlineStatus, socket, isSocketConnected} = useWebSocket()

    const sendOnlineStatus = useCallback((status: boolean) => {
        if (!isSocketConnected() || !currentUser) return;

        toggleOnlineStatus(status);
    }, [isSocketConnected, toggleOnlineStatus]);

    useEffect(() => {
        dispatch(getCurrentUser())
            .unwrap()
            .then(() => {
                connect(() => setSocketConnected(true));
                navigate("/m");
            })
            .catch(() => navigate("/m/login"))
            .finally(() => setIsFetching(false));
        dispatch(getUserDialogs());
    }, [dispatch, navigate]);

    useOnlineStatus({
        onHide: () => sendOnlineStatus(false),
        onShow: () => sendOnlineStatus(true),
        onLoad: () => setTimeout(() => sendOnlineStatus(true), 500)
    });

    if (isFetching || !currentUser || !socketConnected) {
        return (
            <SmoothSpawn>
                <Loader className="mx-auto h-[40px] w-[40px]"/>
            </SmoothSpawn>
        )
    }

    return (
        <WebSocketProvider>
            {children}
        </WebSocketProvider>
    )
}