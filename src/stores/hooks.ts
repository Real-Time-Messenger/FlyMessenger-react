import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootStore} from "./types";
import {ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators} from "@reduxjs/toolkit";
import {useMemo} from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useStateSelector: TypedUseSelectorHook<RootStore> = useSelector;

export type BoundActions<Actions extends ActionCreatorsMapObject> = {
    [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
        ? BoundAsyncThunk<Actions[key]>
        : Actions[key];
};

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
    ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

export const useActionsCreators = <
    Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
    actions: Actions
): BoundActions<Actions> => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), []);
}