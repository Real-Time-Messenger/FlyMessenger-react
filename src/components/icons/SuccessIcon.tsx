import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const SuccessIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                    d="M 21.999023 11.100586 L 21.999023 6.899414 C 21.999023 3.401367 20.598633 2.000977 17.100586 2.000977 L 12.899414 2.000977 C 9.401367 2.000977 8.000977 3.401367 8.000977 6.899414 L 8.000977 8.000977 L 11.100586 8.000977 C 14.598633 8.000977 15.999023 9.401367 15.999023 12.899414 L 15.999023 15.999023 L 17.100586 15.999023 C 20.598633 15.999023 21.999023 14.598633 21.999023 11.100586 Z M 21.999023 11.100586 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"
                />
                <path
                    d="M 15.999023 17.100586 L 15.999023 12.899414 C 15.999023 9.401367 14.598633 8.000977 11.100586 8.000977 L 6.899414 8.000977 C 3.401367 8.000977 2.000977 9.401367 2.000977 12.899414 L 2.000977 17.100586 C 2.000977 20.598633 3.401367 21.999023 6.899414 21.999023 L 11.100586 21.999023 C 14.598633 21.999023 15.999023 20.598633 15.999023 17.100586 Z M 15.999023 17.100586 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"
                />
                <path
                    d="M 6.079102 15 L 8.030273 16.951172 L 11.920898 13.048828 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"
                />
            </g>
        </svg>
    );
};
