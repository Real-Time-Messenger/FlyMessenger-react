import {useCallback, useEffect, useState} from "react";
import {LastSeenDate, parseDateToLastSeen} from "../helpers/helpers";

const minutes = 1000 * 60;

/**
 * `useLastActivityTime` is for parsing the last user activity and
 * returning the last user activity already with translation.
 */
export const useLastActivityTime = (date: string | null) => {
    const [lastSeen, setLastSeen] = useState<LastSeenDate>();

    const updateDate = useCallback(() => {
        setLastSeen(parseDateToLastSeen(date));
    }, [date]);

    useEffect(() => {
        updateDate();

        const interval = setInterval(() => {
            updateDate();
        }, minutes);

        return () => {
            clearInterval(interval);
        };
    }, [date, updateDate]);

    if (!date) return { title: "lastSeenRecently" };

    return { ...lastSeen };
};
