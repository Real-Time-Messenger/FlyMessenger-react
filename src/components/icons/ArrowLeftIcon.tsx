import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const ArrowLeftIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                <path d="M 18.999023 12 L 5.000977 12 " transform="matrix(1.333333,0,0,1.333333,0,0)" />
                <path d="M 12 18.999023 L 5.000977 12 L 12 5.000977 " transform="matrix(1.333333,0,0,1.333333,0,0)" />
            </g>
        </svg>
    );
};
