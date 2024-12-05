import {State} from "@/models/search";
import {MutationType} from "./types/enums/mutation-type";
import {ProgramGuideItem, OnDemandItem, Channel, Credit} from "@ca.vmedia.tv/domains";
import {Paging} from '@/models/core';
import defaultState from "./state";
import {setToInitialState} from '@/utils/set-to-initial-state';
import {AppConstants} from "@/common";
import { OnDemandData } from "@ca.vmedia.tv/domains";

const mutations = {
    [MutationType.SET_TYPE_MODE_ENABLED](state: State, value: boolean) {
        state.typeModeEnabled = value;
    },
    [MutationType.SET_QUERY](state: State, query: string) {
        state.query = query;
    },

    [MutationType.CLEAR_QUERY](state: State) {
        state.query = '';
    },

    [MutationType.SET_LIVE_LOADING](state: State, loading: boolean) {
        state.isLiveLoading = loading;
    },
    [MutationType.SET_LIVE_SEARCH_RESULT](state: State, payload: {items: ProgramGuideItem[]; paging: Paging}) {
        state.liveSearchResult = payload.items;
        state.liveSearchPaging = payload.paging;
    },
    [MutationType.APPEND_LIVE_SEARCH_RESULT](state: State, programs: ProgramGuideItem[]) {
        state.liveSearchResult = [...state.liveSearchResult, ...programs];
    },
    [MutationType.SET_LIVE_SEARCH_DATE](state: State, date: number) {
        state.liveSearchDate = date;
    },

    [MutationType.SET_MOVIES_LOADING](state: State, loading: boolean) {
        state.isMoviesLoading = loading;
    },
    [MutationType.SET_MOVIES_SEARCH_RESULT](state: State, payload: {items: OnDemandItem[]; paging: Paging}) {
        state.moviesSearchResult = payload.items;
        state.moviesSearchPaging = payload.paging;
    },
    [MutationType.APPEND_MOVIES_SEARCH_RESULT](state: State, programs: OnDemandItem[]) {
        state.moviesSearchResult = [...state.moviesSearchResult, ...programs];
    },

    [MutationType.SET_SHOWS_LOADING](state: State, loading: boolean) {
        state.isShowsLoading = loading;
    },
    [MutationType.SET_SHOWS_SEARCH_RESULT](state: State, payload: {items: OnDemandItem[]; paging: Paging}) {
        state.showsSearchResult = payload.items;
        state.showsSearchPaging = payload.paging;
    },
    [MutationType.APPEND_SHOWS_SEARCH_RESULT](state: State, programs: OnDemandItem[]) {
        state.showsSearchResult = [...state.showsSearchResult, ...programs];
    },

    [MutationType.SET_CHANNELS_LOADING](state: State, loading: boolean) {
        state.isChannelsLoading = loading;
    },
    [MutationType.SET_CHANNELS_SEARCH_RESULT](state: State, payload: {items: Channel[]; paging: Paging}) {
        state.channelsSearchResult = payload.items;
        state.channelsSearchPaging = payload.paging;
    },
    [MutationType.APPEND_CHANNELS_SEARCH_RESULT](state: State, channels: Channel[]) {
        state.channelsSearchResult = [...state.channelsSearchResult, ...channels];
    },

    [MutationType.SET_CREDITS_LOADING](state: State, loading: boolean) {
        state.isCreditsLoading = loading;
    },
    [MutationType.SET_CREDITS_SEARCH_RESULT](state: State, payload: {items: Credit[]; paging: Paging}) {
        state.creditsSearchResult = payload.items;
        state.creditsSearchPaging = payload.paging;
    },
    [MutationType.APPEND_CREDITS_SEARCH_RESULT](state: State, credits: Credit[]) {
        state.creditsSearchResult = [...state.creditsSearchResult, ...credits];
    },

    [MutationType.CLEAR_ALL](
        state: State,
    ) {
        setToInitialState(state, defaultState());
    },
    [MutationType.CUT_SEARCH_RESULT](
        state: State,
    ) {
        if (state.showsSearchResult.length > AppConstants.ItemsInLine) {
            state.showsSearchResult = state.showsSearchResult.slice(0, AppConstants.ItemsInLine);
        }
        if (state.channelsSearchResult.length > AppConstants.ItemsInLine) {
            state.channelsSearchResult = state.channelsSearchResult.slice(0, AppConstants.ItemsInLine);
        }
        if (state.liveSearchResult.length > AppConstants.ItemsInLine) {
            state.liveSearchResult = state.liveSearchResult.slice(0, AppConstants.ItemsInLine);
        }
        if (state.moviesSearchResult.length > AppConstants.ItemsInLine) {
            state.moviesSearchResult = state.moviesSearchResult.slice(0, AppConstants.ItemsInLine);
        }
        if (state.creditsSearchResult.length > AppConstants.ItemsInLine) {
            state.creditsSearchResult = state.creditsSearchResult.slice(0, AppConstants.ItemsInLine);
        }
    },

    [MutationType.SET_LINE_SEARCH_RESULT](state: State, data: OnDemandData) {
        state.searchResult = data;
    },
};

export default mutations;
