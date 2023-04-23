import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const ArchiveIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                <path d="M 14 5.333984 L 14 14 L 2 14 L 2 5.333984 " transform="matrix(2,0,0,2,0,0)" />
                <path
                    d="M 15.333984 2 L 0.666016 2 L 0.666016 5.333984 L 15.333984 5.333984 Z M 15.333984 2 "
                    transform="matrix(2,0,0,2,0,0)"
                />
                <path d="M 6.666016 8 L 9.333984 8 " transform="matrix(2,0,0,2,0,0)" />
            </g>
        </svg>
    );
};
