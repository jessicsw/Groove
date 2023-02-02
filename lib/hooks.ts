import { createTypedHooks } from "easy-peasy";
import { ActiveSongsModel } from "./store";

const typedHooks = createTypedHooks<ActiveSongsModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
