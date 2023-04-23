import { FC } from "react";
import { ClassNameProps } from "@/interfaces/ClassNameProps";

export const WarningIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                    d="M 12 7.749023 L 12 12.999023 M 21.079102 8.581055 L 21.079102 15.418945 C 21.079102 16.541016 20.481445 17.581055 19.508789 18.149414 L 13.570312 21.580078 C 12.600586 22.139648 11.399414 22.139648 10.420898 21.580078 L 4.479492 18.149414 C 4.001953 17.874023 3.606445 17.475586 3.328125 16.995117 C 3.052734 16.514648 2.90918 15.972656 2.90918 15.418945 L 2.90918 8.581055 C 2.90918 7.458984 3.509766 6.418945 4.479492 5.850586 L 10.420898 2.419922 C 11.390625 1.860352 12.588867 1.860352 13.570312 2.419922 L 19.508789 5.850586 C 20.481445 6.418945 21.079102 7.450195 21.079102 8.581055 Z M 21.079102 8.581055 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"
                />
                <path d="M 12 16.201172 L 12 16.300781 " transform="matrix(1.333333,0,0,1.333333,0,0)" />
            </g>
        </svg>
    );
};
