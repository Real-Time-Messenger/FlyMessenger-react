import { FC } from "react";
import { ClassNameProps } from "@/interfaces/ClassNameProps";

export const HamburgerMenuIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                    d="M 3 6.999023 L 21 6.999023 M 3 12 L 21 12 M 3 17.000977 L 21 17.000977 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"
                />
            </g>
        </svg>
    );
};
