import { ClassNameProps } from "../ClassNameProps";

/**
 * Props for the {@link Switch} component.
 *
 * @interface SwitchProps
 *
 * @extends {ClassNameProps}
 *
 * @property {boolean} checked - Whether the switch is checked or not.
 * @property {function} onChange - The handler to call when the switch is changed.
 */
export interface SwitchProps extends ClassNameProps {
    checked: boolean;
    onChange: (checked?: boolean) => void;
    disabled?: boolean;
}
