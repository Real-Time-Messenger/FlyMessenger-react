import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const SunIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                    d="M 12.000003 18.500981 C 13.72266 18.500981 15.377934 17.815434 16.596684 16.596684 C 17.815434 15.377934 18.500981 13.72266 18.500981 12.000003 C 18.500981 10.277346 17.815434 8.622072 16.596684 7.403322 C 15.377934 6.184572 13.72266 5.499025 12.000003 5.499025 C 10.277346 5.499025 8.622072 6.184572 7.403322 7.403322 C 6.184572 8.622072 5.499025 10.277346 5.499025 12.000003 C 5.499025 13.72266 6.184572 15.377934 7.403322 16.596684 C 8.622072 17.815434 10.277346 18.500981 12.000003 18.500981 Z M 12.000003 18.500981 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"
                />
                <path
                    d="M 19.139653 19.139653 L 19.010747 19.010747 M 19.010747 4.989259 L 19.139653 4.860353 Z M 4.860353 19.139653 L 4.989259 19.010747 Z M 12.000003 2.080079 L 12.000003 2.000977 Z M 12.000003 21.999029 L 12.000003 21.919927 Z M 2.080079 12.000003 L 2.000977 12.000003 Z M 21.999029 12.000003 L 21.919927 12.000003 Z M 4.989259 4.989259 L 4.860353 4.860353 Z M 4.989259 4.989259 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"
                />
            </g>
        </svg>
    );
};
