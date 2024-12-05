<template>
    <header id="header" class="wrapper-header">
        <div class="header" :class="headerClassNames">
            <div class="header__logo">
                <icon-publisher :icon-name="'IconHome'" />
            </div>
            <div class="header__navigation">
                <nav>
                    <ul id="header-menu"
                        tabindex="0"
                        class="header__menu-items"
                        @focus="onFocus">
                        <li v-for="menuItem in menuItems"
                            :key="menuItem.code"
                            class="header-menu__entry">
                            <a
                                :id="getId(menuItem.code)"
                                class="header__menu-link"
                                :class="{'header__menu-link_icon': menuItem.icon, 'header__menu-link_active': isCurrentLink(menuItem.routerPath)}"
                                data-type="menu-item"
                                :data-keyleft="prevItem(menuItem.code)"
                                :data-keyright="nextItem(menuItem.code)"
                                :href="menuItem.routerPath"
                                @focus="onFocusLink()"
                                @blur="onBlurLink()"
                                @click.prevent="goToNextPage(menuItem.routerPath)"
                            >
                                <icon-navigation v-if="menuItem.icon !== null" 
                                    :icon-name="menuItem.icon" 
                                    class="header__icon"
                                />
                                <span v-else>{{ $t(menuItem.title) }}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { LinkItemCode } from "./types/enums/link-item-code";
import { LinkItem } from "./types/LinkItem";
import { AccountStoreModule, GetterType as AccountGetterType } from "@/store/account/types/AccountStoreModule";
import { linkItems as menuItems } from "./types/LinkItemsCollection";
import Vue from "vue";
import { EventBus } from "@/common/events/eventbus";
import {ApplicationStoreModule, MutationType as ApplicationMutationType, GetterType as ApplicationGetterType} from "@/store/application/types";
import { IconPublisher, IconNavigation } from "@/components/Icons";
import {PublisherСonstants} from "@/common";

type Data = {
    isRegKeyListeners: boolean;
};

export default Vue.extend({
    name: "HeaderComponent",

    components: {
        IconPublisher,
        IconNavigation
    },

    data: (): Data => ({
        isRegKeyListeners: false,
    }),

    computed: {
        currentSelectedIdProgram(): string | null {
            return ApplicationStoreModule.get<string | null>(this.$store,  ApplicationGetterType.GET_CURRENT_SELECTED_ID_PROGRAM);
        },
        isHeaderVisible(): boolean {
            return ApplicationStoreModule.get<boolean>(
                this.$store,
                ApplicationGetterType.GET_HEADER_VISIBILITY
            );
        },
        isGuideAvailable(): boolean {
            return AccountStoreModule.get<boolean>(
                this.$store,
                AccountGetterType.IS_GUIDE_AVAILABLE
            );
        },
        isVodAvailable(): boolean {
            return AccountStoreModule.get<boolean>(
                this.$store,
                AccountGetterType.IS_VOD_AVAILABLE
            );
        },
        isGuest(): boolean {
            return AccountStoreModule.get<boolean>(
                this.$store,
                AccountGetterType.IS_GUEST
            );
        },
        menuItems(): LinkItem[] {
            let res: LinkItem[] = [];
            const menuClient = PublisherСonstants.linkItems.main.client;
            const menuGuest = PublisherСonstants.linkItems.main.guest;

            if (this.isGuest && menuGuest.length > 0) {
                menuGuest.forEach(item => {
                    res.push(menuItems[item]);
                });
            } 

            if (!this.isGuest && menuClient.length > 0) {
                menuClient.forEach(item => {
                    res.push(menuItems[item]);
                });
            }

            if (!this.isGuest && res.length > 0) {
                res = res.filter((item: LinkItem)=>{
                    if ((item.title == 'menu.guide' && !this.isGuideAvailable) || (item.title == 'menu.onDemand' && !this.isVodAvailable)) {
                        return false;
                    } else {
                        return true;
                    }
                });
            }
            return res;
        },
        isFontsHeaderGotham(): boolean {
            return PublisherСonstants.isFontsHeaderGotham;
        },
        headerClassNames(): { [key: string]: boolean } {
            return {
                'header_hidden': !this.isHeaderVisible,
                'header_font-gotham': this.isFontsHeaderGotham
            };
        }
    },

    methods: {
        keyBackListener() {
            if (this.$route.path === menuItems.home.routerPath) {
                this.openModal();
            } else {
                this.$router.go(-1);
            }
        },
        openModal(): void {
            ApplicationStoreModule.commit(
                this.$store,
                ApplicationMutationType.OPEN_MODAL_EXIT_APP
            );
        },
        onKeyDown() {
            this.leaveHeader();
        },
        registerKeyListeners() { 
            this.$navigator.on("keypress:back", this.keyBackListener);
            this.$navigator.on("keypress:down", this.onKeyDown);
            this.isRegKeyListeners = true;
        },
        unregisterKeyListeners() {
            this.$navigator.off("keypress:back", this.keyBackListener);
            this.$navigator.off("keypress:down", this.onKeyDown);
            this.isRegKeyListeners = false;
        },
        onFocusLink(): void {
            this.registerKeyListeners();
        },
        onBlurLink(): void {
            this.unregisterKeyListeners();
        },
        isCurrentLink(href: string): boolean {
            let isCurrentLink = false;
            const currentRoute = this.$route.path;

            if (currentRoute.indexOf(href.toString()) === 0) {
                isCurrentLink = true;
            }

            return isCurrentLink;
        },
        async goToNextPage(url: string) {
            if (this.$route.path === url) {
                return;
            }
            ApplicationStoreModule.commit(this.$store, ApplicationMutationType.DELETE_ALL_SELECTED_ID_PROGRAM);
            await this.$router.push(url);
        },
        prevItem(menuItemCode: LinkItemCode) {

            const ind = this.menuItems.findIndex(
                (value) => value.code === menuItemCode
            );

            if (ind === 0) {
                return this.getId(this.menuItems[0].code);
            }

            return this.getId(this.menuItems[ind - 1].code);
        },
        nextItem(menuItemCode: LinkItemCode) {
            const ind = this.menuItems.findIndex(
                (value) => value.code === menuItemCode
            );

            let id = this.getId(this.menuItems[this.menuItems.length - 1].code);

            if (ind !== this.menuItems.length - 1) {
                 id = this.getId(this.menuItems[ind + 1].code);
            }

            return id;
        },
        getId(menuItemCode: LinkItemCode): string {
            return `mi${menuItemCode}`;
        },
        leaveHeader() {
            EventBus.$emit('leave-header');
        },
        onFocus() {
            ApplicationStoreModule.commit(
                this.$store,
                ApplicationMutationType.SHOW_HEADER
            );
            this.$el.scrollIntoView();
            const activeMenuItems = document.querySelector<HTMLElement>("a.header__menu-link_active");
            if (!activeMenuItems) {
                document.getElementById(this.getId(this.menuItems[0].code))?.focus();
                return;
            }
            activeMenuItems?.focus();
        },
    },

    beforeDestroy() {
        if (this.isRegKeyListeners) {
            this.unregisterKeyListeners();
        }
    },
});
</script>
