import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const BellOffIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                    d="M 11.442871 17.5 C 11.296387 17.751465 11.083984 17.961426 10.83252 18.10791 C 10.578613 18.254395 10.292969 18.330078 10 18.330078 C 9.707031 18.330078 9.421387 18.254395 9.16748 18.10791 C 8.916016 17.961426 8.706055 17.751465 8.55957 17.5 "
                    transform="matrix(1.6,0,0,1.6,0,0)"
                />
                <path
                    d="M 15.524902 10.83252 C 15.153809 9.475098 14.978027 8.07373 15 6.66748 "
                    transform="matrix(1.6,0,0,1.6,0,0)"
                />
                <path
                    d="M 5.217285 5.217285 C 5.070801 5.686035 5 6.174316 5 6.66748 C 5 12.5 2.5 14.16748 2.5 14.16748 L 14.16748 14.16748 "
                    transform="matrix(1.6,0,0,1.6,0,0)"
                />
                <path
                    d="M 15 6.66748 C 15.002441 5.761719 14.755859 4.870605 14.291992 4.094238 C 13.828125 3.317871 13.15918 2.680664 12.36084 2.253418 C 11.5625 1.82373 10.664062 1.621094 9.758301 1.665039 C 8.85498 1.708984 7.978516 1.99707 7.224121 2.5 "
                    transform="matrix(1.6,0,0,1.6,0,0)"
                />
                <path d="M 0.83252 0.83252 L 19.16748 19.16748 " transform="matrix(1.6,0,0,1.6,0,0)" />
            </g>
        </svg>
    );
};
