import {State} from "@/models/search";
import {GetterType} from "./types/enums/getter-type";
import {Paging} from '@/models/core';
import {AppConstants} from "@/common";
import {ProgramGuideItem} from "@ca.vmedia.tv/domains";
import {
    CardData,
    ProgramCardData,
    OnDemandCardData,
    ChannelLiveCardData,
    CreditCardData,
} from "@/components/LineView";

export type Getters = {[key in GetterType]: any};

export default {
    [GetterType.GET_TYPE_MODE_ENABLED](state: State): boolean {
        return state.typeModeEnabled;
    },
    [GetterType.GET_QUERY](state: State): string {
        return state.query;
    },
    [GetterType.GET_LOADING](_state: State, getters: Getters): boolean {
        return getters[GetterType.GET_LIVE_LOADING] ||
            getters[GetterType.GET_MOVIES_LOADING] ||
            getters[GetterType.GET_SHOWS_LOADING] ||
            getters[GetterType.GET_CHANNELS_LOADING] ||
            getters[GetterType.GET_CREDITS_LOADING];
    },
    [GetterType.GET_HAS_RESULT](_state: State, getters: Getters): boolean {
        return getters[GetterType.GET_LIVE_RESULT].length > 0 ||
            getters[GetterType.GET_MOVIES_RESULT].length > 0 ||
            getters[GetterType.GET_SHOWS_RESULT].length > 0 ||
            getters[GetterType.GET_CHANNELS_RESULT].length > 0 ||
            getters[GetterType.GET_CREDITS_RESULT].length > 0;
    },

    [GetterType.GET_LIVE_RESULT](state: State): CardData[] {
        return state.liveSearchResult.map(item => new ProgramCardData(item, false));
    },
    [GetterType.GET_LIVE_RESULT_ITEM_BY_ID]: (_state: State, getters: Getters) =>
        (itemId: number): ProgramGuideItem | null => {
            const items: ProgramCardData[] = getters[GetterType.GET_LIVE_RESULT];
      
            return items.find(item => item.getProgram().recentAirTime!.id === itemId)?.getPlayItem() ?? null;
        },
    [GetterType.GET_LIVE_RESULT_PREVIEW](_state: State, getters: Getters): CardData[] {
        return getters[GetterType.GET_LIVE_RESULT].slice(0, AppConstants.ItemsInLine);
    },
    [GetterType.GET_LIVE_RESULT_COUNT](_state: State, getters: Getters): number {
        return getters[GetterType.GET_LIVE_RESULT].length;
    },
    [GetterType.GET_LIVE_HAS_RESULT](_state: State, getters: Getters): boolean {
        return getters[GetterType.GET_LIVE_RESULT_COUNT] > 0;
    },
    [GetterType.GET_LIVE_HAS_MORE_RESULT](_state: State, getters: Getters): boolean {
        const loadedCount = getters[GetterType.GET_LIVE_RESULT_COUNT];
        const totalCount = getters[GetterType.GET_LIVE_PAGING].total;
        return loadedCount < totalCount;
    },
    [GetterType.GET_LIVE_PAGING](state: State): Paging {
        return state.liveSearchPaging;
    },
    [GetterType.GET_LIVE_LOADING](state: State): boolean {
        return state.isLiveLoading;
    },
    [GetterType.GET_LIVE_SEARCH_DATE](state: State): number | null {
        return state.liveSearchDate;
    },
    [GetterType.GET_MOVIES_RESULT](state: State): CardData[] {
        return state.moviesSearchResult.map(item => new OnDemandCardData(item));
    },
    [GetterType.GET_MOVIES_RESULT_PREVIEW](_state: State, getters: Getters): CardData[] {
        return getters[GetterType.GET_MOVIES_RESULT].slice(0, AppConstants.ItemsInLine);
    },
    [GetterType.GET_MOVIES_RESULT_COUNT](_state: State, getters: Getters): number {
        return getters[GetterType.GET_MOVIES_RESULT].length;
    },
    [GetterType.GET_MOVIES_HAS_RESULT](_state: State, getters: Getters): boolean {
        return getters[GetterType.GET_MOVIES_RESULT_COUNT] > 0;
    },
    [GetterType.GET_MOVIES_HAS_MORE_RESULT](_state: State, getters: Getters): boolean {
        const loadedCount = getters[GetterType.GET_MOVIES_RESULT_COUNT];
        const totalCount = getters[GetterType.GET_MOVIES_PAGING].total;
        return loadedCount < totalCount;
    },
    [GetterType.GET_MOVIES_PAGING](state: State): Paging {
        return state.moviesSearchPaging;
    },
    [GetterType.GET_MOVIES_LOADING](state: State): boolean {
        return state.isMoviesLoading;
    },

    [GetterType.GET_SHOWS_RESULT](state: State): CardData[] {
        return state.showsSearchResult.map(item => new OnDemandCardData(item));
    },
    [GetterType.GET_SHOWS_RESULT_PREVIEW](_state: State, getters: Getters): CardData[] {
        return getters[GetterType.GET_SHOWS_RESULT].slice(0, AppConstants.ItemsInLine);
    },
    [GetterType.GET_SHOWS_RESULT_COUNT](_state: State, getters: Getters): number {
        return getters[GetterType.GET_SHOWS_RESULT].length;
    },
    [GetterType.GET_SHOWS_HAS_RESULT](_state: State, getters: Getters): boolean {
        return getters[GetterType.GET_SHOWS_RESULT_COUNT] > 0;
    },
    [GetterType.GET_SHOWS_HAS_MORE_RESULT](_state: State, getters: Getters): boolean {
        const loadedCount = getters[GetterType.GET_SHOWS_RESULT_COUNT];
        const totalCount = getters[GetterType.GET_SHOWS_PAGING].total;
        return loadedCount < totalCount;
    },
    [GetterType.GET_SHOWS_PAGING](state: State): Paging {
        return state.showsSearchPaging;
    },
    [GetterType.GET_SHOWS_LOADING](state: State): boolean {
        return state.isShowsLoading;
    },

    [GetterType.GET_CHANNELS_RESULT](state: State): ChannelLiveCardData[] {
        return state.channelsSearchResult.map(item => new ChannelLiveCardData(item));
    },
    [GetterType.GET_CHANNELS_RESULT_PREVIEW](_state: State, getters: Getters): CardData[] {
        return getters[GetterType.GET_CHANNELS_RESULT].slice(0, AppConstants.ItemsInLine);
    },
    [GetterType.GET_CHANNELS_RESULT_COUNT](_state: State, getters: Getters): number {
        return getters[GetterType.GET_CHANNELS_RESULT].length;
    },
    [GetterType.GET_CHANNELS_HAS_RESULT](_state: State, getters: Getters): boolean {
        return getters[GetterType.GET_CHANNELS_RESULT_COUNT] > 0;
    },
    [GetterType.GET_CHANNELS_HAS_MORE_RESULT](_state: State, getters: Getters): boolean {
        const loadedCount = getters[GetterType.GET_CHANNELS_RESULT_COUNT];
        const totalCount = getters[GetterType.GET_CHANNELS_PAGING].total;
        return loadedCount < totalCount;
    },
    [GetterType.GET_CHANNELS_PAGING](state: State): Paging {
        return state.channelsSearchPaging;
    },
    [GetterType.GET_CHANNELS_LOADING](state: State): boolean {
        return state.isChannelsLoading;
    },

    [GetterType.GET_CREDITS_RESULT](state: State): CreditCardData[] {
        return state.creditsSearchResult.map(item => new CreditCardData(item));
    },
    [GetterType.GET_CREDITS_RESULT_PREVIEW](_state: State, getters: Getters): CardData[] {
        return getters[GetterType.GET_CREDITS_RESULT].slice(0, AppConstants.ItemsInLine);
    },
    [GetterType.GET_CREDITS_RESULT_COUNT](_state: State, getters: Getters): number {
        return getters[GetterType.GET_CREDITS_RESULT].length;
    },
    [GetterType.GET_CREDITS_HAS_MORE_RESULT](_state: State, getters: Getters): boolean {
        const loadedCount = getters[GetterType.GET_CREDITS_RESULT_COUNT];
        const totalCount = getters[GetterType.GET_CREDITS_PAGING].total;
        return loadedCount < totalCount;
    },
    [GetterType.GET_CREDITS_PAGING](state: State): Paging {
        return state.creditsSearchPaging;
    },
    [GetterType.GET_CREDITS_LOADING](state: State): boolean {
        return state.isCreditsLoading;
    },
};
