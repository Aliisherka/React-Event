import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

export const useTypedselector: TypedUseSelectorHook<RootState> = useSelector;