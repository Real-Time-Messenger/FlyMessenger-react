import { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/ClassNameProps";

/**
 * Props for the {@link RatioButton} component.
 *
 * @extends ClassNameProps
 *
 * @property {() => void} changed - The callback for when the ratio button is changed.
 * @property {string} id - The id of the ratio button.
 * @property {boolean} isSelected - The flag that indicates whether the ratio button is selected.
 * @property {string} label - The label of the ratio button.
 * @property {string | number | readonly string[]} [value] - The value of the ratio button.
 */
interface RatioButtonProps extends ClassNameProps {
    changed: () => void;
    id: string;
    isSelected: boolean;
    label: string;
    value?: string | number | readonly string[];
}

/**
 * The ratio button component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const RatioButton: FC<RatioButtonProps> = ({ changed, id, isSelected, label, value, className }) => {
    return (
        <div
            className={classNames(
                "flex w-full cursor-pointer select-none items-center gap-4 px-4 py-2 hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65]",
                className,
            )}
            onClick={changed}
        >
            <input
                type="radio"
                id={id}
                value={value}
                checked={isSelected}
                onChange={changed}
                className="h-2 w-2 cursor-pointer appearance-none rounded-full outline outline-2 outline-offset-4 outline-[#5B9BD9] checked:bg-[#5B9BD9] dark:outline-[#B8BAF2] dark:checked:bg-[#B8BAF2]"
            />
            <label htmlFor={id} className="pointer-events-none cursor-pointer dark:text-[#B8BAF2]">
                {label}
            </label>
        </div>
    );
};
