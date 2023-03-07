import {forwardRef, ImgHTMLAttributes} from "react";
import {ClassNameProps} from "../../interfaces/ClassNameProps";

type AvatarProps = ClassNameProps & ImgHTMLAttributes<HTMLImageElement>

export function Avatar({className, ...props}: AvatarProps) {
    return (
        <img
            className={className}
            {...props}
        />
    );
}