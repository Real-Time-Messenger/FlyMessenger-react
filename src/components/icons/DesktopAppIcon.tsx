import { FC } from "react";
import { ClassNameProps } from "@/interfaces/ClassNameProps";

export const DesktopAppIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g xmlns="http://www.w3.org/2000/svg" id="surface1">
                <path d="M 0 4.40625 L 13.113281 2.601562 L 13.113281 15.269531 L 0 15.269531 Z M 0 27.59375 L 13.113281 29.398438 L 13.113281 16.886719 L 0 16.886719 Z M 14.558594 29.59375 L 32 32 L 32 16.886719 L 14.558594 16.886719 Z M 14.558594 2.40625 L 14.558594 15.269531 L 32 15.269531 L 32 0 Z M 14.558594 2.40625 " />
            </g>
        </svg>
    );
};
