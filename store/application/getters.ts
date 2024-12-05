import { ApplicationState } from "./state";
import { GetterType } from "./types/enums/getter-type";
import { ShowTypes } from "@ca.vmedia.tv/domains";
export default {
    /**
     * Getter to deliver The presence of the id of the selected program
     * @param {ApplicationState} state the global state
     * @returns boolean new value
     */
     [GetterType.GET_IS_HAVE_FOCUSED_ELEMENT](state: ApplicationState): boolean {
        return state.isHavSelectedIdProgram;
    },
    /**
     * Getter to deliver visibility state of header.
     * @param {ApplicationState} state the global state
     * @returns {boolean} header visibility
     */
    [GetterType.GET_HEADER_VISIBILITY](state: ApplicationState): boolean {
        return state.isHeaderVisible;
    },
    /**
     * Getter to deliver a image url template
     * @param {ApplicationState} state the global state
     * @returns {string} The image url template
     */
    [GetterType.GET_IMAGE_URL_TEMPLATE](state: ApplicationState): string {
        return state.ImageUrlTemplate;
    },
    /**
     * Getter to deliver a image url template
     * @param {ApplicationState} state the global state
     * @returns {string} The image workaround url template
     */
    [GetterType.GET_IMAGE_WORKAROUND_URL_TEMPLATE](
        state: ApplicationState
    ): string {
        return state.ImageWorkaroundUrlTemplate;
    },
    /**
     * Getter to deliver names of currently focused elements
     * @param {ApplicationState} state the global state
     * @returns {Set<string>} List of focused component names
     */
    [GetterType.GET_FOCUSED_ELEMENTS](state: ApplicationState): Set<string> {
        return state.FocusedElements;
    },
    /**
     * Getter to deliver "exit app" modal state
     * @param {ApplicationState} state the global state
     * @returns {boolean} value
     */
    [GetterType.IS_MODAL_EXIT_APP_SHOW](state: ApplicationState): boolean {
        return state.isModalExitAppShown;
    },
    /**
     * Getter to deliver "sign out" modal state
     * @param {ApplicationState} state the global state
     * @returns {boolean} value
     */
    [GetterType.IS_MODAL_SIGN_OUT_SHOW](state: ApplicationState): boolean {
        return state.isModalSignOutShown;
    },
    /**
     * Getter to deliver "expired code" modal state
     * @param {ApplicationState} state the global state
     * @returns {boolean} value
     */
    [GetterType.IS_MODAL_EXPIRED_CODE](state: ApplicationState): boolean {
        return state.isModalExpiredCodeShown;
    },
    /**
     * Getter to deliver "sign in unavailable" modal state
     * @param {ApplicationState} state the global state
     * @returns {boolean} value
     */
    [GetterType.IS_MODAL_SIGN_IN_UNAVAILABLE](state: ApplicationState): boolean {
        return state.isModalSignInUnavailableShown;
    },
    /**
     * Getter to deliver selected id of program
     * @param {ApplicationState} state the global state
     * @returns {[key: string]: string | null} selected id of program
     */
    [GetterType.GET_SELECTED_ID_PROGRAM](state: ApplicationState): string[] {
        return state.selectedIdProgram;
    },
    /**
     * Getter to deliver current selected id of program
     * @param {ApplicationState} state the global state
     * @returns {[key: string]: string | null} current selected id of program
     */
    [GetterType.GET_CURRENT_SELECTED_ID_PROGRAM](state: ApplicationState): string | null {
        return String(state.selectedIdProgram.slice(0).pop());
    },
    [GetterType.IS_PREVIEW_SIGN_IN_MODAL](state: ApplicationState): boolean {
        return state.isPreviewSingInModal;
    },
    [GetterType.IS_OKTA_TOKEN_ERROR_MODAL](state: ApplicationState): boolean {
        return state.isOktaTokenErrorModal;
    },
    [GetterType.IS_OKTA_SERVER_ERROR_MODAL](state: ApplicationState): boolean {
        return state.isOktaServerErrorModal;
    },
    [GetterType.GET_DISABLE_ROUTE_CHANGE](state: ApplicationState): boolean {
        return state.disableRouteChange;
    },
    [GetterType.IS_SHOWING_INTERNET_MODAL](state: ApplicationState): boolean {
        return state.isInternetModalShow;
    },
    [GetterType.GET_COUNTER_VOD](state: ApplicationState): number {
        return state.counterLines['vod'];
    },
    [GetterType.GET_COUNTER_MYTV](state: ApplicationState): number {
        return state.counterLines['mytv'];
    },
    [GetterType.GET_COUNTER_SEARCH](state: ApplicationState): number {
        return state.counterLines['search'];
    },
    [GetterType.GET_COUNTER_HOME](state: ApplicationState): number {
        return state.counterLines['home'];
    },
    [GetterType.GET_COUNTER_GENRE](state: ApplicationState): number {
        return state.counterLines['genre'];
    },
    [GetterType.GET_COUNTER_DETAIL](state: ApplicationState): number {
        return state.counterLines['detail'];
    },
    [GetterType.GET_TOOLTIPE_SHOWING](state: ApplicationState): boolean {
        return state.tooltipeShowing;
    },
    [GetterType.GET_TOOLTIPE_MESSAGE](state: ApplicationState): string {
        return state.tooltipeMessage;
    },
    [GetterType.GET_PRIVACY_POLICY_TEMPLATE](state: ApplicationState): string {
        return state.privacyPolicyTemplate;
    },
    [GetterType.GET_ABOUT_US_TEMPLATE](state: ApplicationState): string {
        return state.aboutUsTemplate;
    },
    [GetterType.GET_VISIBLE_FORGOT](state: ApplicationState): boolean {
        return state.visibleForgot;
    },
    [GetterType.GET_IS_DISABLED_SENTRY](state: ApplicationState): boolean {
        return state.isDisabledSentry;
    },
    [GetterType.GET_VISIBLE_DESCRIPTION](state: ApplicationState): string {
        return state.visibleDescription;
    },

    [GetterType.GET_CURRENT_TIME](state: ApplicationState): number {
        return state.currentTime;
    },
    [GetterType.GET_FORGOT_LINK](state: ApplicationState): string {
        return state.forgotLink;
    },
    [GetterType.GET_SHOWING_TOOLTIPE_TIME](state: ApplicationState): number {
        return state.tooltipeShowingTime;
    },
    [GetterType.GET_VOLUME](state: ApplicationState): number {
        return state.player.volume;
    },
    [GetterType.GET_FILTER](state: ApplicationState): string | null {
        return state.filter;
    },
    [GetterType.GET_FILTER_PARAMS](state: ApplicationState): any {
        const filters = state.filter;
        let showType = undefined;
        let cashDisabled= false;
        if (filters) {
            switch (filters) {
                case "All":
                    showType = ShowTypes.None;
                break;

                case "Series":
                    showType = ShowTypes.Series;
                break;

                case "Movie":
                    showType = ShowTypes.Movie;
                break;
            }
            cashDisabled = true;
        }
        return {showType, cashDisabled};
    },
};
