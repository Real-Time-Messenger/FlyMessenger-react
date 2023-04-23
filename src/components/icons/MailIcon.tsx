import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const MailIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <g xmlns="http://www.w3.org/2000/svg" id="surface1">
                <path d="M 5.332031 5.332031 L 26.667969 5.332031 C 28.132812 5.332031 29.332031 6.535156 29.332031 8 L 29.332031 24 C 29.332031 25.464844 28.132812 26.667969 26.667969 26.667969 L 5.332031 26.667969 C 3.867188 26.667969 2.667969 25.464844 2.667969 24 L 2.667969 8 C 2.667969 6.535156 3.867188 5.332031 5.332031 5.332031 Z M 5.332031 5.332031 " />
                <path d="M 29.332031 8 L 16 17.332031 L 2.667969 8 " />
            </g>
        </svg>
    );
};
