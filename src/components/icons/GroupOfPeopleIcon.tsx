import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const GroupOfPeopleIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
                <path d="M 22.625 19.253906 C 24.453125 19.558594 26.464844 19.238281 27.878906 18.292969 C 29.761719 17.039062 29.761719 14.988281 27.878906 13.734375 C 26.453125 12.785156 24.414062 12.464844 22.585938 12.785156 M 9.332031 19.253906 C 7.507812 19.558594 5.492188 19.238281 4.078125 18.292969 C 2.199219 17.039062 2.199219 14.988281 4.078125 13.734375 C 5.507812 12.785156 7.546875 12.464844 9.375 12.785156 M 24 9.546875 C 23.917969 9.535156 23.832031 9.535156 23.746094 9.546875 C 22.855469 9.515625 22.015625 9.136719 21.398438 8.496094 C 20.78125 7.855469 20.4375 6.996094 20.441406 6.105469 C 20.441406 4.199219 21.972656 2.667969 23.878906 2.667969 C 24.792969 2.667969 25.667969 3.027344 26.3125 3.675781 C 26.957031 4.320312 27.320312 5.195312 27.320312 6.105469 C 27.316406 6.996094 26.96875 7.851562 26.351562 8.496094 C 25.734375 9.136719 24.890625 9.511719 24 9.546875 Z M 7.960938 9.546875 C 8.039062 9.535156 8.132812 9.535156 8.214844 9.546875 C 9.101562 9.515625 9.945312 9.136719 10.5625 8.496094 C 11.179688 7.855469 11.523438 6.996094 11.519531 6.105469 C 11.519531 4.199219 9.988281 2.667969 8.078125 2.667969 C 7.167969 2.667969 6.292969 3.027344 5.648438 3.675781 C 5.003906 4.320312 4.640625 5.195312 4.640625 6.105469 C 4.652344 7.972656 6.121094 9.480469 7.960938 9.546875 Z M 16 19.507812 C 15.917969 19.492188 15.832031 19.492188 15.746094 19.507812 C 14.855469 19.472656 14.015625 19.097656 13.398438 18.457031 C 12.78125 17.8125 12.4375 16.957031 12.441406 16.066406 C 12.441406 14.160156 13.972656 12.625 15.878906 12.625 C 16.792969 12.625 17.667969 12.988281 18.3125 13.632812 C 18.957031 14.28125 19.320312 15.15625 19.320312 16.066406 C 19.308594 17.933594 17.839844 19.453125 16 19.507812 Z M 12.121094 23.707031 C 10.238281 24.960938 10.238281 27.011719 12.121094 28.265625 C 14.253906 29.691406 17.746094 29.691406 19.878906 28.265625 C 21.761719 27.011719 21.761719 24.960938 19.878906 23.707031 C 17.761719 22.292969 14.253906 22.292969 12.121094 23.707031 Z M 12.121094 23.707031 " />
            </g>
        </svg>
    );
};
