import {useNavigate} from "react-router-dom";
import {useAppDispatch, useStateSelector} from "../stores/hooks";
import {ChildrenProps} from "../interfaces/ChildrenProps";
import {useEffect, useState} from "react";
import {getCurrentUser} from "../stores/slices/user/user";
import {SmoothSpawn} from "../components/pages/auth/layouts/SmoothSpawn";
import {Loader} from "../components/ui/Loader";
import {getUserDialogs} from "../stores/slices/dialogs/dialogs";
import {useWebSocket, WebSocketProvider} from "./WebSocketProvider";
import {useOnlineStatus} from "../hooks/useOnlineStatus";

export const ProtectedRoute = ({children}: ChildrenProps) => {
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const currentUser = useStateSelector((state) => state.user.current);
    const navigate = useNavigate();

    const {connect, toggleOnlineStatus} = useWebSocket()

    useEffect(() => {
        setIsFetching(true);

        dispatch(getCurrentUser())
            .unwrap()
            .then(() => {
                connect(() => toggleOnlineStatus(true));
                navigate("/m");
            })
            .catch(() => navigate("/m/login"))
            .finally(() => setIsFetching(false));
        dispatch(getUserDialogs());
    }, [dispatch, navigate]);

    useEffect(() => {
        if (!currentUser && !isFetching) {
            navigate("/m/login");
        }
    }, [currentUser, navigate]);

    useOnlineStatus({
        onHide: () => toggleOnlineStatus(false),
        onShow: () => toggleOnlineStatus(true),
    });

    if (isFetching || !currentUser) {
        return (
            <SmoothSpawn>
                <Loader className="mx-auto h-[40px] w-[40px]"/>
            </SmoothSpawn>
        )
    }

    return (
        <>
            {children}
        </>
    )
}