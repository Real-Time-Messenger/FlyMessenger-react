import { FC, ImgHTMLAttributes } from "react";
import { ClassNameProps } from "@/interfaces/ClassNameProps";

/**
 * Default avatar props.
 */
type AvatarProps = ClassNameProps & ImgHTMLAttributes<HTMLImageElement>;

/**
 * Renders the image as an avatar.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const Avatar: FC<AvatarProps> = ({ className, ...props }) => {
    return <img className={className} {...props} alt="" />;
};
