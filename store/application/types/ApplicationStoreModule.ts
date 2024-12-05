import { State } from "@/models/application";
import { ActionType } from "./enums/action-type";
import { GetterType } from "./enums/getter-type";
import { MutationType } from "./enums/mutation-type";
import { StoreModule } from '@/models/store';

export const ApplicationStoreModule = new StoreModule<State, ActionType, MutationType, GetterType>(
    'application'
);

export { ActionType, MutationType, GetterType };