import { useCallback, useEffect, useState } from "react";

export default function useKeyPress(targetKeys: string | string[] | null, callback: () => void) {
    if (!targetKeys) return;

    targetKeys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pressedKeys, setKeys] = useState<object>(targetKeys.reduce((acc, key) => ({ ...acc, [key as string]: false }), {}));

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const downHandler = useCallback(
        (event: KeyboardEvent) => {
            if (!targetKeys) return;

            if (targetKeys.includes(event.key)) {
                event.preventDefault();

                setKeys((prevKeys) => ({
                    ...prevKeys,
                    [event.key]: true,
                }));
            }
        },
        [targetKeys],
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const upHandler = useCallback(
        (event: KeyboardEvent) => {
            if (!targetKeys) return;

            if (targetKeys.includes(event.key)) {
                setKeys((prevKeys) => ({
                    ...prevKeys,
                    [event.key]: false,
                }));
            }

            if (Object.values(pressedKeys).every((key) => key)) {
                callback();
            }
        },
        [callback, pressedKeys, targetKeys],
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, [targetKeys, pressedKeys, downHandler, upHandler]);
}
