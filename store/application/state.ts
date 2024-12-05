import { State } from "@/models/application";
import { AppConstants } from "@/common";
import { TimeUtils } from "@/utils";
/**
 * Application store, used for the data describing the application itself
 */

const state = (): State => ({
    ImageUrlTemplate: "" as string,
    ImageWorkaroundUrlTemplate: "" as string,
    FocusedElements: new Set() as Set<string>,
    /**
     * The property is responsible for showing the modal window "sign out"
     */
    isModalSignOutShown: false,
    /**
     * The property is responsible for showing the modal window "exit app"
     */
    isModalExitAppShown: false,
    isModalExpiredCodeShown: false,
    isModalSignInUnavailableShown: false,
    /**
     * The property is responsible for the visibility of the header
     */
    isHeaderVisible: true,
    /**
     * ID of the selected program
     */
    selectedIdProgram: [],
    isHavSelectedIdProgram: false,
    isPreviewSingInModal: false,
    /**
     * Forbids rerouting
     */
    disableRouteChange: false,
    isInternetModalShow: false,
    /**
     * displayed shelf counter
     */
    counterLines: {
        vod: AppConstants.VodCounterLines,
        mytv: AppConstants.MytvCounterLines,
        search: AppConstants.SearchCounterLines,
        home: AppConstants.HomeCounterLines,
        genre: AppConstants.GenreCounterLines,
        detail: AppConstants.DetailCounterLines,
    },
    tooltipeShowing: false,
    privacyPolicyTemplate: '',
    aboutUsTemplate: '',
    visibleForgot: false,
    isDisabledSentry: false,
    visibleDescription: 'off',
    /**
     * current time ms format
     */
    currentTime: TimeUtils.dateNow(),
    tooltipeMessage: '',
    forgotLink: '',
    tooltipeShowingTime: 0,
    player: {
        volume: 100
    },
    filter: null,
    isOktaTokenErrorModal: false,
    isOktaServerErrorModal: false
});

export type ApplicationState = ReturnType<typeof state>;

export default state;
