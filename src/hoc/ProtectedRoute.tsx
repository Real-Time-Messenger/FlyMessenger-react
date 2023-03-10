import {useNavigate} from "react-router-dom";
import {useAppDispatch, useStateSelector} from "../stores/hooks";
import {ChildrenProps} from "../interfaces/ChildrenProps";
import {useEffect, useState} from "react";
import {SmoothSpawn} from "../components/pages/auth/layouts/SmoothSpawn";
import {Loader} from "../components/ui/Loader";
import {getCurrentUser} from "../stores/slices/user/user";
import {getUserDialogs} from "../stores/slices/dialogs/dialogs";
import {useOnlineStatus} from "../hooks/useOnlineStatus";
import {useWebSocket, WebSocketProvider} from "./WebSocketProvider";

export const ProtectedRoute = ({children}: ChildrenProps) => {
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const currentUser = useStateSelector((state) => state.user.current);
    const navigate = useNavigate();

    const {isSocketConnected, toggleOnlineStatus} = useWebSocket();

    const setOnlineStatus = async (status: boolean) => {
        toggleOnlineStatus(status);
    };

    useOnlineStatus({
        onHide: () => setOnlineStatus(false),
        onShow: () => setOnlineStatus(true),
    });

    useEffect(() => {
        dispatch(getCurrentUser())
            .unwrap()
            .then(() => {
                navigate("/m");
            })
            .catch(() => navigate("/m/login"))
            .finally(() => setIsFetching(false));
        dispatch(getUserDialogs());
    }, [dispatch, navigate]);

    if (isFetching || !currentUser.id || !isSocketConnected) {
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
    );
}