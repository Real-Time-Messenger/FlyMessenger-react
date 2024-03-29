import { FC } from "react";
import { ClassNameProps } from "@/interfaces/ClassNameProps";

export const GithubIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                    d="M 9 18.999023 C 3.999023 20.499023 3.999023 16.5 2.000977 15.999023 M 15.999023 21.999023 L 15.999023 18.128906 C 16.037109 17.654297 15.972656 17.173828 15.811523 16.722656 C 15.647461 16.274414 15.392578 15.864258 15.058594 15.518555 C 18.199219 15.169922 21.500977 13.980469 21.500977 8.519531 C 21.500977 7.125 20.961914 5.780273 20.000977 4.769531 C 20.455078 3.547852 20.422852 2.197266 19.910156 0.999023 C 19.910156 0.999023 18.729492 0.650391 15.999023 2.481445 C 13.708008 1.857422 11.291016 1.857422 9 2.481445 C 6.269531 0.650391 5.088867 0.999023 5.088867 0.999023 C 4.576172 2.197266 4.543945 3.547852 5.000977 4.769531 C 4.03125 5.789062 3.492188 7.142578 3.500977 8.548828 C 3.500977 13.96875 6.799805 15.161133 9.94043 15.550781 C 9.612305 15.890625 9.357422 16.294922 9.196289 16.740234 C 9.032227 17.185547 8.967773 17.657227 9 18.128906 L 9 21.999023 "
                    transform="matrix(1.333333,0,0,1.333333,0,0)"
                />
            </g>
        </svg>
    );
};
