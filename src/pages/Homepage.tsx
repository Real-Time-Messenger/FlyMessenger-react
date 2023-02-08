import {MainLayout} from "../components/layout/MainLayout";
import { MessagesList } from "../components/messages/MessagesList";
import {useStateSelector} from "../stores/hooks";

export const Homepage = () => {
    return (
        <MainLayout>
            <MessagesList />
        </MainLayout>
    )
}