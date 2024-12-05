import { State } from '@/models/search';

const state = (): State => ({
    query: '',
    typeModeEnabled: false,

    isLiveLoading: false,
    liveSearchResult: [],
    liveSearchPaging: {
        total: 0,
        itemsOnPage: 0,
    },
    liveSearchDate: null,

    isMoviesLoading: false,
    moviesSearchResult: [],
    moviesSearchPaging: {
        total: 0,
        itemsOnPage: 0,
    },

    isShowsLoading: false,
    showsSearchResult: [],
    showsSearchPaging: {
        total: 0,
        itemsOnPage: 0,
    },

    isChannelsLoading: false,
    channelsSearchResult: [],
    channelsSearchPaging: {
        total: 0,
        itemsOnPage: 0,
    },

    isCreditsLoading: false,
    creditsSearchResult: [],
    creditsSearchPaging: {
        total: 0,
        itemsOnPage: 0,
    },

    searchResult:  null,
});

export default state;
