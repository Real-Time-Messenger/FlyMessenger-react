import {FC} from "react";
import {ClassNameProps} from "../../interfaces/ClassNameProps";

export const ArrowUpIcon: FC<ClassNameProps> = ({className}: ClassNameProps) => {
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
                    d="M 19.918945 15.049805 L 13.400391 8.53125 C 12.629883 7.760742 11.370117 7.760742 10.599609 8.53125 L 4.081055 15.049805 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"/>
            </g>
        </svg>
    );
};
