import {MainLayout} from "../../components/layout/MainLayout";
import { MessagesList } from "../../components/messages/MessagesList";
import {useStateSelector} from "../../stores/hooks";

export const HomePage = () => {
    return (
        <MainLayout>
            <MessagesList />
        </MainLayout>
    )
}