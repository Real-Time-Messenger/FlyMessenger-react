import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const ArrowUpCircleIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                <path
                    d="M 8 14.666016 C 11.681641 14.666016 14.666016 11.681641 14.666016 8 C 14.666016 4.318359 11.681641 1.333984 8 1.333984 C 4.318359 1.333984 1.333984 4.318359 1.333984 8 C 1.333984 11.681641 4.318359 14.666016 8 14.666016 Z M 8 14.666016 "
                    transform="matrix(2,0,0,2,0,0)"
                />
                <path d="M 10.666016 8 L 8 5.333984 L 5.333984 8 " transform="matrix(2,0,0,2,0,0)" />
                <path d="M 8 10.666016 L 8 5.333984 " transform="matrix(2,0,0,2,0,0)" />
            </g>
        </svg>
    );
};
