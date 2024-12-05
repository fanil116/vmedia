import {ActionType} from "./types/enums/action-type";
import {MutationType} from "./types/enums/mutation-type";
import {ProgramGuideItem, OnDemandItem, Channel, Credit} from "@ca.vmedia.tv/domains";
import {Services} from "@ca.vmedia.tv/services";
import {GetterType} from './types';
import {Store} from 'vuex';
import {State} from '@/models/search';
import {AppConstants} from '@/common';
import {Paging} from '@/models/core';
import {Getters} from "@/models/store";
import {ChannelsStoreModule, GetterType as ChannelsGetterType} from "@/store/channels/types";
import {TimeUtils} from "@/utils";

const actions = {
    [ActionType.SET_QUERY](
        store: Store<State>,
        query: string
    ): void {
        if (query === store.getters[GetterType.GET_QUERY]) {
            return;
        }

        store.commit(MutationType.SET_QUERY, query);
        store.dispatch(ActionType.SEARCH_LIVE);
        store.dispatch(ActionType.SEARCH_MOVIES);
        store.dispatch(ActionType.SEARCH_SHOWS);
        store.dispatch(ActionType.SEARCH_CHANNELS);
        store.dispatch(ActionType.SEARCH_CREDITS);
    },

    async [ActionType.SEARCH_LIVE](
        store: Store<State>
    ): Promise<void> {

        store.commit(MutationType.SET_LIVE_SEARCH_DATE, TimeUtils.dateNow());

        const query = store.getters[GetterType.GET_QUERY];
        let items: ProgramGuideItem[] = [];
        let paging = new Paging(null);

        if (query) {
            const date: number = store.getters[GetterType.GET_LIVE_SEARCH_DATE];
            const dateFrom = TimeUtils.getMoment(date).add(-7, "days").valueOf();
            const dateTill = TimeUtils.getMoment(date).add(7, "days").valueOf();

            store.commit(MutationType.SET_LIVE_LOADING, true);
            // pages numbered from 1
            const response = await Services.Instance.guide.searchPrograms(
                {
                    searchText: query,
                    dateFrom,
                    dateTill,
                },
                AppConstants.ItemsInLine,
                1,
            );
            if (response.items) {
                items = response.items;
            }
            paging = new Paging(response.paging);
            store.commit(MutationType.SET_LIVE_LOADING, false);
        }
        store.commit(MutationType.SET_LIVE_SEARCH_RESULT, {items, paging});
    },

    async [ActionType.LOAD_LIVE_NEXT_PAGE](
        store: Store<State>
    ): Promise<void> {
        const query = store.getters[GetterType.GET_QUERY];
        const paging = store.getters[GetterType.GET_LIVE_PAGING];
        const loadedItemsCount = store.getters[GetterType.GET_LIVE_RESULT_COUNT];
        store.commit(MutationType.SET_LIVE_LOADING, true);

        const date: number = store.getters[GetterType.GET_LIVE_SEARCH_DATE];
        const dateFrom = TimeUtils.getMoment(date).add(-7, "days").valueOf();
        const dateTill = TimeUtils.getMoment(date).add(7, "days").valueOf();

        const page = Math.ceil(loadedItemsCount / paging.itemsOnPage) + 1;
        const response = await Services.Instance.guide.searchPrograms(
            {
                searchText: query,
                dateFrom,
                dateTill,
            },
            AppConstants.ItemsInLine,
            page,
        );

        const items = response.items;

        store.commit(MutationType.APPEND_LIVE_SEARCH_RESULT, items);
        store.commit(MutationType.SET_LIVE_LOADING, false);
    },

    async [ActionType.SEARCH_MOVIES](
        store: Store<State>
    ): Promise<void> {

        const query = store.getters[GetterType.GET_QUERY];
        let items: OnDemandItem[] = [];
        let paging = new Paging(null);

        if (query) {
            store.commit(MutationType.SET_MOVIES_LOADING, true);
            // pages numbered from 1
            const response = await Services.Instance.vod.searchMovies(
                query,
                1,
                AppConstants.ItemsInLine,
            );

            items = response.items!;
            paging = new Paging(response.paging);
            store.commit(MutationType.SET_MOVIES_LOADING, false);
        }

        store.commit(MutationType.SET_MOVIES_SEARCH_RESULT, {items, paging});
    },

    async [ActionType.LOAD_MOVIES_NEXT_PAGE](
        store: Store<State>
    ): Promise<void> {
        const query = store.getters[GetterType.GET_QUERY];
        const paging = store.getters[GetterType.GET_MOVIES_PAGING];
        const loadedItemsCount = store.getters[GetterType.GET_MOVIES_RESULT_COUNT];
        store.commit(MutationType.SET_MOVIES_LOADING, true);

        const page = Math.ceil(loadedItemsCount / paging.itemsOnPage) + 1;
        const response = await Services.Instance.vod.searchMovies(query,
            page,
            AppConstants.ItemsInLine,
        );

        const items = response.items;

        store.commit(MutationType.APPEND_MOVIES_SEARCH_RESULT, items);
        store.commit(MutationType.SET_MOVIES_LOADING, false);
    },

    async [ActionType.SEARCH_SHOWS](
        store: Store<State>
    ): Promise<void> {

        const query = store.getters[GetterType.GET_QUERY];
        let items: OnDemandItem[] = [];
        let paging = new Paging(null);

        if (query) {
            store.commit(MutationType.SET_SHOWS_LOADING, true);
            // pages numbered from 1
            const response = await Services.Instance.vod.searchShows(query,
                1,
                AppConstants.ItemsInLine,
            );

            items = response.items!;
            paging = new Paging(response.paging);
            store.commit(MutationType.SET_SHOWS_LOADING, false);
        }

        store.commit(MutationType.SET_SHOWS_SEARCH_RESULT, {items, paging});
    },

    async [ActionType.LOAD_SHOWS_NEXT_PAGE](
        store: Store<State>
    ): Promise<void> {
        const query = store.getters[GetterType.GET_QUERY];
        const paging = store.getters[GetterType.GET_SHOWS_PAGING];
        const loadedItemsCount = store.getters[GetterType.GET_SHOWS_RESULT_COUNT];
        store.commit(MutationType.SET_SHOWS_LOADING, true);
        
        const page = Math.ceil(loadedItemsCount / paging.itemsOnPage) + 1;
        const response = await Services.Instance.vod.searchShows(
            query,
            page,
            AppConstants.ItemsInLine,
        );

        const items = response.items;

        store.commit(MutationType.APPEND_SHOWS_SEARCH_RESULT, items);
        store.commit(MutationType.SET_SHOWS_LOADING, false);
    },

    async [ActionType.SEARCH_CHANNELS](
        store: { commit: Function; rootGetters: Getters; getters: Getters }
    ): Promise<void> {

        const query = store.getters[GetterType.GET_QUERY];
        const itemsOnPage = AppConstants.ItemsInLine;

        if (query) {
            store.commit(MutationType.SET_CHANNELS_LOADING, true);
            const availableChannels = store.rootGetters[ChannelsStoreModule.Namespace + '/' + ChannelsGetterType.GET_FILTERED_CHANNELS](query);

            availableChannels.paging = {
                itemsOnPage: itemsOnPage,
                pageNumber: 0,
                totalItems: availableChannels.length,
                totalPages: Math.ceil(availableChannels.length / itemsOnPage),
            };

            let items: Channel[] = availableChannels.slice(0, itemsOnPage);
            let paging = new Paging(availableChannels.paging);
   
            store.commit(MutationType.SET_CHANNELS_SEARCH_RESULT, {items, paging});
            store.commit(MutationType.SET_CHANNELS_LOADING, false); 
        }
    },

    async [ActionType.LOAD_CHANNELS_NEXT_PAGE](
        store: { commit: Function; rootGetters: Getters; getters: Getters }
    ): Promise<void> {
        const query = store.getters[GetterType.GET_QUERY];
        const paging = store.getters[GetterType.GET_CHANNELS_PAGING];
        const loadedItemsCount = store.getters[GetterType.GET_CHANNELS_RESULT_COUNT];
        store.commit(MutationType.SET_CHANNELS_LOADING, true);

        const page = Math.floor(loadedItemsCount / paging.itemsOnPage);
        let offsetStart = page * paging.itemsOnPage;
        let offsetEnd = offsetStart + paging.itemsOnPage;

        const availableChannels = store.rootGetters[ChannelsStoreModule.Namespace + '/' + ChannelsGetterType.GET_FILTERED_CHANNELS](query);

        let items: Channel[] = availableChannels.slice(offsetStart, offsetEnd);

        store.commit(MutationType.APPEND_CHANNELS_SEARCH_RESULT, items);
        store.commit(MutationType.SET_CHANNELS_LOADING, false);
    },

    async [ActionType.SEARCH_CREDITS](
        store: Store<State>
    ): Promise<void> {

        const query = store.getters[GetterType.GET_QUERY];

        let items: Credit[] = [];
        let paging = new Paging(null);

        if (query) {
            store.commit(MutationType.SET_CREDITS_LOADING, true);
            const response = await Services
                .Instance
                .credits
                .searchCredits(query, 0, AppConstants.ItemsInLine);

            items = response.items!;
            paging = new Paging(response.paging);

            store.commit(MutationType.SET_CREDITS_LOADING, false);
        }

        store.commit(MutationType.SET_CREDITS_SEARCH_RESULT, {items, paging});
    },

    async [ActionType.LOAD_CREDITS_NEXT_PAGE](
        store: Store<State>
    ): Promise<void> {

        const query = store.getters[GetterType.GET_QUERY];
        const paging = store.getters[GetterType.GET_CREDITS_PAGING];
        const loadedItemsCount = store.getters[GetterType.GET_CREDITS_RESULT_COUNT];
        store.commit(MutationType.SET_CREDITS_LOADING, true);

        const page = Math.floor(loadedItemsCount / paging.itemsOnPage);

        const response = await Services
            .Instance
            .credits
            .searchCredits(query, page, AppConstants.ItemsInLine);

        const items = response.items;

        store.commit(MutationType.APPEND_CREDITS_SEARCH_RESULT, items);
        store.commit(MutationType.SET_CREDITS_LOADING, false);
    },
};

export default actions;
