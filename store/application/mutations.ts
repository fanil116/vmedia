import {ApplicationState} from "./state";
import {MutationType} from "./types/enums/mutation-type";
import defaultState from "./state";
import {setToInitialState} from '@/utils/set-to-initial-state';
import { AppConstants } from "@/common";
import { isTvDevice } from "@ca.vmedia.tv/domains";
import { TimeUtils } from "@/utils";

export default {
    /**
     * Hide header
     * @param state The Application state to store the data
     */
    [MutationType.SET_IS_HAVE_FOCUSED_ELEMENT](
        state: ApplicationState,
        payload: boolean
    ) {

        state.isHavSelectedIdProgram = payload;
    },
    /**
     * Hide header
     * @param state The Application state to store the data
     */
    [MutationType.HIDE_HEADER](
        state: ApplicationState
    ) {
        if (isTvDevice){
            state.isHeaderVisible = false;
        }
    },
    /**
     * Show header
     * @param state The Application state to store the data
     */
    [MutationType.SHOW_HEADER](
        state: ApplicationState
    ) {
        if (isTvDevice){
            state.isHeaderVisible = true;
        }
    },
    /**
     * Open modal window 'exit app'
     * @param state The Application state to store the data
     */
    [MutationType.OPEN_MODAL_EXIT_APP](
        state: ApplicationState
    ) {
        state.isModalExitAppShown = true;
    },
    /**
     * Close modal window 'exit app'
     * @param state The Application state to store the data
     */
    [MutationType.CLOSE_MODAL_EXIT_APP](
        state: ApplicationState
    ) {
        state.isModalExitAppShown = false;
    },
    /**
     * Set image url temaplate on application start
     * @param state The Application state to store the data
     * @param template The template string
     */
    [MutationType.SET_IMAGE_URL_TEMPLATE](
        state: ApplicationState,
        template: string
    ) {
        state.ImageUrlTemplate = template;
    },
    /**
     * Set image workaround url temaplate on application start
     * @param state The Application state to store the data
     * @param template The template string
     */
    [MutationType.SET_IMAGE_WORKAROUND_URL_TEMPLATE](
        state: ApplicationState,
        template: string
    ) {
        state.ImageWorkaroundUrlTemplate = template;
    },
    /**
     * Add component to list of focused components
     * @param state The Application state to store the data
     * @param componentName Component name
     */
    [MutationType.ADD_FOCUSED_ELEMENT](
        state: ApplicationState,
        componentName: string
    ) {
        state.FocusedElements.add(componentName);
    },
    /**
     * Remove component from list of focused components
     * @param state The Application state to store the data
     * @param componentName Component name
     */
    [MutationType.REMOVE_FOCUSED_ELEMENT](
        state: ApplicationState,
        componentName: string
    ) {
        state.FocusedElements.delete(componentName);
    },

    [MutationType.CLEAR_ALL](
        state: ApplicationState,
    ) {
        setToInitialState(state, defaultState());
    },

    /**
     * Set program ID when going to detail page
     * @param state The Application state to store the data
     * @param selectedIdProgram id of the selected program {[key: string]: string}
     */
    [MutationType.SET_SELECTED_ID_PROGRAM](
        state: ApplicationState,
        selectedIdProgram: string[]
    ) {
        state.selectedIdProgram = [...new Set(state.selectedIdProgram.concat(selectedIdProgram))];
    },
    /**
     * Delete program ID
     * @param state The Application state to store the data
     * @param programId id of the selected program string
     */
    [MutationType.DELETE_SELECTED_ID_PROGRAM](
        state: ApplicationState
    ) {
        if (state.selectedIdProgram) {
            if (state.selectedIdProgram.length == 1) {
                state.selectedIdProgram = [];
            } else {
                const programId: string = state.selectedIdProgram[state.selectedIdProgram.length - 1];
                state.selectedIdProgram = state.selectedIdProgram.filter(element => element !== programId);
            }
           
        }
    },
    /**
     * Delete all program ID
     * @param state The Application state to store the data
     */
    [MutationType.DELETE_ALL_SELECTED_ID_PROGRAM](
        state: ApplicationState
    ) {
        state.selectedIdProgram = [];
    },
    [MutationType.SHOW_PREVIEW_SIGN_IN_MODAL](
        state: ApplicationState,
        show: boolean
    ) {
        state.isPreviewSingInModal = show;
    },
    [MutationType.SHOW_OKTA_TOKEN_ERROR_MODAL](
        state: ApplicationState,
        show: boolean
    ) {
        state.isOktaTokenErrorModal = show;
    },
    [MutationType.SHOW_OKTA_SERVER_ERROR_MODAL](
        state: ApplicationState,
        show: boolean
    ) {
        state.isOktaServerErrorModal = show;
    },
    [MutationType.SET_DISABLE_ROUTE_CHANGE](
        state: ApplicationState,
        payload: boolean
    ) {
        state.disableRouteChange = payload;
    },
    [MutationType.SHOW_INTERNET_MODAL](
        state: ApplicationState,
        show: boolean
    ) {
        state.isInternetModalShow = show;
    },
    [MutationType.SET_COUNTER_VOD](
        state: ApplicationState,
        number: number
    ) {
        state.counterLines['vod'] = number;
    },
    [MutationType.SET_COUNTER_MYTV](
        state: ApplicationState,
        number: number
    ) {
        state.counterLines['mytv'] = number;
    },
    [MutationType.SET_COUNTER_SEARCH](
        state: ApplicationState,
        number: number
    ) {
        state.counterLines['search'] = number;
    },
    [MutationType.SET_COUNTER_HOME](
        state: ApplicationState,
        number: number
    ) {
        state.counterLines['home'] = number;
    },
    [MutationType.SET_COUNTER_GENRE](
        state: ApplicationState,
        number: number
    ) {
        state.counterLines['genre'] = number;
    },
    [MutationType.SET_COUNTER_DETAIL](
        state: ApplicationState,
        number: number
    ) {
        state.counterLines['detail'] = number;
    },
    [MutationType.CLEAR_COUNTER_GENRE](
        state: ApplicationState,
    ) {
        state.counterLines['genre'] = AppConstants.GenreCounterLines;
    },
    [MutationType.CLEAR_COUNTER_HOME](
        state: ApplicationState,
    ) {
        state.counterLines['home'] = AppConstants.HomeCounterLines;
    },
    [MutationType.CLEAR_COUNTER_VOD](
        state: ApplicationState,
    ) {
        state.counterLines['vod'] = AppConstants.VodCounterLines;
    },
    [MutationType.CLEAR_COUNTER_MYTV](
        state: ApplicationState,
    ) {
        state.counterLines['mytv'] = AppConstants.MytvCounterLines;
    },
    [MutationType.CLEAR_COUNTER_DETAIL](
        state: ApplicationState,
    ) {
        state.counterLines['detail'] = AppConstants.DetailCounterLines;
    },
    [MutationType.SET_TOOLTIPE_SHOWING](state: ApplicationState, payload: {visible: boolean; showingTime: number}) {
        state.tooltipeShowing = payload.visible;
        state.tooltipeShowingTime = payload.showingTime;
    },
    [MutationType.SET_TOOLTIPE_MESSAGE](state: ApplicationState, message: string) {
        state.tooltipeMessage = message;
    },
    [MutationType.SET_PRIVACY_POLICY_TEMPLATE](state: ApplicationState, template: string) {
        state.privacyPolicyTemplate = template;
    },
    [MutationType.SET_ABOUT_US_TEMPLATE](state: ApplicationState, template: string) {
        state.aboutUsTemplate = template;
    },
    [MutationType.SET_VISIBLE_FORGOT](state: ApplicationState, show: boolean) {
        state.visibleForgot = show;
    },
    [MutationType.SET_ENABLE_SENTRY](state: ApplicationState) {
        state.isDisabledSentry = false;
    },
    [MutationType.SET_DISABLE_SENTRY](state: ApplicationState) {
        state.isDisabledSentry = true;
    },
    [MutationType.SET_VISIBLE_DESCRIPTION](state: ApplicationState) {
        const itemLocalStorage = JSON.parse(localStorage.getItem("Description")!);
        state.visibleDescription = itemLocalStorage ? itemLocalStorage.description : 'off';
    },

    [MutationType.SET_CURRENT_TIME](state: ApplicationState) {
        state.currentTime = TimeUtils.dateNow();
    },

    [MutationType.SET_FORGOT_LINK](state: ApplicationState, value: string) {
        state.forgotLink = value;
    },
    /**
     * Open modal window 'sign out'
     * @param state The Application state to store the data
     */
    [MutationType.OPEN_MODAL_SIGN_OUT](
        state: ApplicationState
    ) {
        state.isModalSignOutShown = true;
    },
    /**
     * Close modal window 'sign out'
     * @param state The Application state to store the data
     */
    [MutationType.CLOSE_MODAL_SIGN_OUT](
        state: ApplicationState
    ) {
        state.isModalSignOutShown = false;
    },
    [MutationType.SET_VOLUME](state: ApplicationState, value: number) {
        state.player.volume = value;
    },
    [MutationType.SET_FILTER](
        state: ApplicationState,
        value: string
    ) {
        state.filter = value;
    },
    [MutationType.OPEN_MODAL_EXPIRED_CODE](
        state: ApplicationState
    ) {
        state.isModalExpiredCodeShown = true;
    },

    [MutationType.CLOSE_MODAL_EXPIRED_CODE](
        state: ApplicationState
    ) {
        state.isModalExpiredCodeShown = false;
    },
    [MutationType.OPEN_MODAL_SIGN_IN_UNAVAILABLE](
        state: ApplicationState
    ) {
        state.isModalSignInUnavailableShown = true;
    },
    [MutationType.CLOSE_MODAL_SIGN_IN_UNAVAILABLE](
        state: ApplicationState
    ) {
        state.isModalSignInUnavailableShown = false;
    },
};
