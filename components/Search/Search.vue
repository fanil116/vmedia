<template>
    <div id="page-content"
        class="search no-outline"
        :class="{'search__relative':hasScroll}"
        tabindex="0"
        data-no-focus-scroll
        @wheel.prevent="wheel">
        <div class="search__wrapper">
            <div class="search__input-wrapper">
                <input id="query" v-model="query" class="search__input" type="text" data-type="query" data-keydown="search-result" data-keyup="header-menu" :placeholder="enterSearchText" 
                :class="{'search__input_reduced': isFrench}" 
                @focusin="onFocus" @focusout="onFocusout" />
                <icon-common :icon-name="'IconSearch'" class="search__icon" />
            </div>
        </div>
        <div class="search__container">
            <div class="search__transition-container">
                <div v-if="displaySearchResult"
                    class="search__content-wrapper"
                    :class="{'search__content-wrapper_loading': isLoading}">
                    <div v-if="!isLoading" class="search__result-container">
                        <div v-if="!hasResult" class="search__empty-result">
                            <div class="search__empty-result_padding">
                                {{ $t(strings.SEARCH_SEARCH_FOR) }} "{{ query }}"
                            </div>
                            {{ $t(strings.SEARCH_NOTHING_WAS_FOUND) }} <br>
                            {{ $t(strings.SEARCH_TRY_DIFFERENT_KEYWORD) }}
                        </div>
                        <search-result 
                            v-else 
                            ref="searchResult" 
                            class="search__result"
                            :is-back-key-listener-registered="isBackKeyListenerRegistered"
                            @registerKeyListenerBack="registerKeyListenerBack($event)" />
                    </div>
                    <div v-else class="search__loader-wrapper">
                        <loader class="loader_bigger" :is-gray="true"></loader>
                    </div>
                </div>
            </div>
            <div v-if="!displaySearchResult" class="search__no-result search__no-result_visible">
                {{ $t(strings.SEARCH_YOU_CAN_SEARCH) }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {SearchStoreModule} from "@/store/search/types/SearchStoreModule";
import {GetterType, ActionType} from "@/store/search/types/enums";
import Vue from "vue";
import {Strings} from '@/locales/types/enums';
import {Loader} from "@/components/Loader";
import {SearchResult} from "@/components/SearchResult";
import {linkItems} from "@/components/Header";
import {EventBus} from "@/common/events/eventbus";
import {ApplicationStoreModule, MutationType as ApplicationMutationType} from "@/store/application/types";
import { IconCommon } from "@/components/Icons";

interface Data {
    strings: typeof Strings;
    scrollPosition: number;
    isBackKeyListenerRegistered: boolean;
    hasScroll: boolean;
    previousInput: string;
    debounce: any | null;
}
 
export default Vue.extend({
    name: "Search",
    components: { Loader, SearchResult, IconCommon },
    data(): Data {
        return {
            strings: Strings,
            scrollPosition: 0,
            isBackKeyListenerRegistered: false,
            hasScroll: false,
            previousInput: '',
            debounce: null,
        };
    },
    mounted() {
        EventBus.$on("key-up-lines", this.focusHeader);
        EventBus.$on("leave-header", this.focusFirstLine);
        EventBus.$on("leave-query", this.focusSearchResult);
        if (!this.displaySearchResult) {
            this.focusHeader();
        }
    },
    created() {
        const urlQuery = this.$route.query.query;
        if (urlQuery) {
            this.query = `${urlQuery}`;
        }
        this.previousInput = this.query;
    },
    computed: {
        query: {
            get: function() {
                const res = SearchStoreModule.get<string>(
                    this.$store,
                    GetterType.GET_QUERY
                );
                return res;
            },
            set: function(query: string) {
                if (query) {
                    const urlQuery = this.$route.query.query;
                    if (query != urlQuery) {
                        this.$router.replace({ path: linkItems.search.routerPath, query: { query }}).catch(()=>{});
                    }
                } else {
                    this.$router.replace({ path: linkItems.search.routerPath}).catch(()=>{});
                }
                clearTimeout(this.debounce);

                this.debounce = setTimeout(() => {
                    if (query !== this.previousInput) {
                        this.previousInput = query;
                        SearchStoreModule.dispatch(this.$store, ActionType.SET_QUERY, query);
                    }
                }, 1500);
            },
        },
        isLoading: function() {
            return SearchStoreModule.get<boolean>(
                this.$store,
                GetterType.GET_LOADING
            );
        },
        displaySearchResult() {
            return (this as any).query.length > 0;
        },
        hasResult() {
            return SearchStoreModule.get<boolean>(
                this.$store,
                GetterType.GET_HAS_RESULT
            );
        },
        enterSearchText(): string {
            return this.$t(Strings.SEARCH_ENTER_TEXT).toString();
        },
        isFrench(): boolean {
            return this.$i18n.localeProperties.code === 'fr';
        }
    },
    methods: {
        wheel(event: any) {
            if (document.activeElement?.id === 'query') {
                if (event.deltaY < 0) {
                    this.focusHeader();
                }
            }
        },
        focusSearchResult() {
            document.getElementById('search-result')?.focus();
        },
        focusFirstLine() {
            ApplicationStoreModule.commit(
                this.$store,
                ApplicationMutationType.HIDE_HEADER
            );
            document.getElementById('query')?.focus();
        },
        registerKeyListenerBack(value: boolean): void{
            this.isBackKeyListenerRegistered = value;
        },
        focusHeader() {
            document.getElementById("header-menu")?.focus();
        },
        onFocus() {
            this.$navigator.enableLeftAndRightPreventDefault();
            this.registerKeyListeners();
        },
        onFocusout() {
            this.$navigator.disableLeftAndRightPreventDefault();
            this.unregisterKeyListeners();
        },
        registerKeyListeners() {
            this.$navigator.on("keypress:back", this.keyBackListener);
        },
        unregisterKeyListeners() {
            this.$navigator.off("keypress:back", this.keyBackListener);
        },
        keyBackListener() {
            this.focusHeader();
        },
    },

    beforeDestroy() {
        EventBus.$off("key-up-lines", this.focusHeader);
        EventBus.$off("leave-header", this.focusFirstLine);
        EventBus.$off("leave-query", this.focusSearchResult);
    },

});
</script>
