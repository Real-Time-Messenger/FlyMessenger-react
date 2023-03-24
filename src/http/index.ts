import ky from "ky";

export const API_URL = import.meta.env.VITE_API_URL + "/api";

export const $api = ky.create({
    prefixUrl: API_URL,
    credentials: "include",
    headers: {
        'X-Client-Name': 'Fly Messenger',
        'X-Client-Type': 'web',
        'X-Client-Version': import.meta.env.VITE_REACT_APP_VERSION,
    },
    hooks: {
        afterResponse: [
            async (_input, _options, response) => {
                if (response.ok) return;

                const body = await response.json();
                if (body.error) {
                    throw new Error(body.error.message);
                }
            },
        ],
    },
});