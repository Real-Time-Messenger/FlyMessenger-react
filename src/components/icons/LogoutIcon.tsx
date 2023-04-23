import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const LogoutIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                    d="M 15.300293 5.532227 C 16.347656 6.582031 17.062988 7.91748 17.351074 9.372559 C 17.641602 10.827637 17.492676 12.336426 16.923828 13.706055 C 16.357422 15.075684 15.395508 16.247559 14.162598 17.072754 C 12.929688 17.895508 11.479492 18.334961 9.995117 18.334961 C 8.513184 18.334961 7.062988 17.895508 5.830078 17.072754 C 4.597168 16.247559 3.635254 15.075684 3.066406 13.706055 C 2.5 12.336426 2.351074 10.827637 2.63916 9.372559 C 2.929688 7.91748 3.642578 6.582031 4.692383 5.532227 "
                    transform="matrix(1.6,0,0,1.6,0,0)"
                />
                <path d="M 10 1.66748 L 10 10 " transform="matrix(1.6,0,0,1.6,0,0)" />
            </g>
        </svg>
    );
};
