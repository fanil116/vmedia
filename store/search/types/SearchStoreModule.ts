import {State} from "@/models/search";
import {ActionType} from "./enums/action-type";
import {GetterType} from "./enums/getter-type";
import {MutationType} from "./enums/mutation-type";
import {StoreModule} from '@/models/store';

export const SearchStoreModule =
    new StoreModule <State, ActionType, MutationType, GetterType>('search')
;

export {GetterType, ActionType, MutationType} from "./enums";
