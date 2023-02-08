import { FC } from "react";
import classNames from "classnames";

/**
 * Interface for the `RationButton` component.
 */
type RatioButtonProps = {
    changed: () => void;
    id: string;
    isSelected: boolean;
    label: string;
    value?: string | number | readonly string[];
    className?: string;
};

export const RatioButton: FC<RatioButtonProps> = ({ changed, id, isSelected, label, value, className }: RatioButtonProps) => {
    return (
        <div
            className={classNames("flex w-full cursor-pointer select-none items-center gap-4 px-4 py-2 hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65]", className)}
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
            <label
                htmlFor={id}
                className="pointer-events-none cursor-pointer dark:text-[#B8BAF2]"
            >
                {label}
            </label>
        </div>
    );
};
