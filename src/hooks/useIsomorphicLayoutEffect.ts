import { useEffect, useLayoutEffect } from "react";

/**
 * React hook that works like `useLayoutEffect`, but can be safely used in both client-side and server-side rendering.
 * It is recommended to use `useLayoutEffect`
 * when possible to ensure the effect runs synchronously after all DOM mutations,
 * but if the same code is used on the server, this can cause a mismatch between the server and the client.
 *
 * @param {function} effect - Function to run during the layout phase of the component lifecycle.
 * @param {array} deps - Optional array of dependencies to compare to determine whether the effect should re-run.
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
