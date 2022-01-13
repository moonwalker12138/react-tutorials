import React, {
    DependencyList,
    EffectCallback,
    useContext,
    useDebugValue,
    useEffect,
    useRef,
    useState,
} from "react";
import { IRecord } from "./Shared/Billboard";
import { RefContext } from "./Shared/PageWrapper";

export function getCSSValue(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export function asleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function sleep(milliseconds: number) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + milliseconds);
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomBoolean(): boolean {
    return Math.random() < 0.5;
}

/* Custom Hooks */

export function useForceUpdate() {
    const [value, setValue] = useState(0);
    useDebugValue(value);
    return () => setValue(value + 1);
}

export function useUpdateRefs() {
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        forceUpdate();
    }, []);
}

export function useMountEffect(effect: EffectCallback) {
    useEffect(() => {
        effect();
    }, []);
}

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            effect();
        }
    }, deps);
}

export function useUnmountEffect(effect: () => void) {
    useEffect(() => {
        return () => effect();
    }, []);
}

// export function usePrevious<T>(initValue: T, target: T) {
//     const ref = useRef<T>(initValue);
//     useEffect(() => {
//         ref.current = target;
//     });

//     return ref;
// }

// export function useSyncState<T>(initValue: T): [React.RefObject<T>, (newValue: T) => void] {
//     const forceUpdate = useForceUpdate();

//     const ref = useRef(initValue);
//     const setValue = (newValue: T) => {
//         ref.current = newValue;
//         forceUpdate();
//     };

//     return [ref, setValue];
// }

export function useSyncState<T>(
    initValue: T
): [React.RefObject<T>, (newValue: T) => void] {
    const forceUpdate = useForceUpdate();

    const ref = useRef<T>(initValue);
    const setValue = (newValue: T) => {
        ref.current = newValue;
        forceUpdate();
    };

    return [ref, setValue];
}

export function useLog() {
    const {loggerRef} = useContext(RefContext);
    return (chat: IRecord) => {
        loggerRef?.current?.append(chat);
    };
}

/* Custom Hooks */
