import {ClassNameProps} from "../ClassNameProps";

/**
 * Base interface for `Switch` component.
 */
export interface SwitchProps extends ClassNameProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}
