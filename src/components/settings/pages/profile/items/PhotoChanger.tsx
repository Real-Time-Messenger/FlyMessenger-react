import { ChangeEvent, createRef, FC } from "react";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { updateAvatar } from "@/stores/slices/user/user";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { CameraIcon } from "@/components/icons";

/**
 * Component for changing the current user's avatar.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const PhotoChanger: FC = () => {
    const photoURL = useStateSelector((state) => state.user.current.photoURL);
    const fileRef = createRef<HTMLInputElement>();
    const dispatch = useAppDispatch();

    /**
     * Opens the file dialog.
     */
    const openFileDialog = (): void => {
        if (!fileRef.current) return;

        fileRef.current.click();
    };

    /**
     * Handler for updating current user avatar.
     *
     * @param {ChangeEvent<HTMLInputElement>} event - The event.
     */
    const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (!event.target.files || !event.target.files[0]) return;

        const formData = new FormData();
        formData.append("file", event.target.files[0]);

        dispatch(updateAvatar(formData));
    };

    return (
        <div className="relative cursor-pointer" onClick={openFileDialog}>
            <Avatar src={photoURL} alt={photoURL} className="h-[100px] w-[100px] rounded-full" />

            <div className="absolute bottom-0 right-0 translate-x-1/4 rounded-full border-2 border-[#EAEDFA] bg-[#70A7DD] p-2 dark:border-[#10182B] dark:bg-[#457BA9]">
                <CameraIcon className="h-6 w-6 stroke-[1.5]" />
            </div>

            <input
                ref={fileRef}
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleAvatarChange}
            />
        </div>
    );
};
