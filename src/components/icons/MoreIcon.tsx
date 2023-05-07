import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const MoreIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g xmlns="http://www.w3.org/2000/svg">
                <path d="M 6.667969 13.332031 C 5.199219 13.332031 4 14.535156 4 16 C 4 17.464844 5.199219 18.667969 6.667969 18.667969 C 8.132812 18.667969 9.332031 17.464844 9.332031 16 C 9.332031 14.535156 8.132812 13.332031 6.667969 13.332031 Z M 25.332031 13.332031 C 23.867188 13.332031 22.667969 14.535156 22.667969 16 C 22.667969 17.464844 23.867188 18.667969 25.332031 18.667969 C 26.800781 18.667969 28 17.464844 28 16 C 28 14.535156 26.800781 13.332031 25.332031 13.332031 Z M 16 13.332031 C 14.535156 13.332031 13.332031 14.535156 13.332031 16 C 13.332031 17.464844 14.535156 18.667969 16 18.667969 C 17.464844 18.667969 18.667969 17.464844 18.667969 16 C 18.667969 14.535156 17.464844 13.332031 16 13.332031 Z M 16 13.332031 " />
            </g>
        </svg>
    );
};
