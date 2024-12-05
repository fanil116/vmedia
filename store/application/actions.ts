import { MutationType } from "./types/enums/mutation-type";
import { ActionType } from "./types/enums/action-type";
import { Domains } from "@ca.vmedia.tv/domains";
import { Logger } from '@/utils';
import {Services} from "@ca.vmedia.tv/services";
/**
 * Global module actions
 * All the module logics is to be in actions methods
 */
const actions = {
    async [ActionType.ADD_SELECTED_ID_PROGRAM](
        { commit }: { commit: Function }, id: string) {
            let selectedIdProgram: string[] = [];

        if (id) {
            selectedIdProgram.push(id);
        }

        commit(MutationType.SET_SELECTED_ID_PROGRAM, selectedIdProgram);
    },

    /**
     * Get Image url templates action
     * @param {Function} {commit} The commit function to call the mutations
     * @param domains domains plugin to perform an api request
     */
    async [ActionType.GET_IMAGE_URL_TEMPLATES](
        { commit }: { commit: Function },
        domains: Domains
    ) {
        try {
            const templates =
                await domains.imagesRepository.getImageUrlTemplates();
            domains.domainsSettings.imagesWorkaroundUrlTemplate =
                templates?.defaults ?? "";
            domains.domainsSettings.imagesUrlTemplate =
                templates?.imageId ?? "";
            commit(
                MutationType.SET_IMAGE_WORKAROUND_URL_TEMPLATE,
                domains.domainsSettings.imagesWorkaroundUrlTemplate
            );
            commit(
                MutationType.SET_IMAGE_URL_TEMPLATE,
                domains.domainsSettings.imagesUrlTemplate
            );
        } catch (error) {
            Logger.captureLog(error);
        }
    },
    async [ActionType.FETCH_PRIVACY_TEMPLATE](
        { commit }: { commit: Function },
        resourceCode: string
    ) {
        try {
            const templates =
                await Services.Instance.domains.resourcesRepository.getResources(resourceCode);
            commit(
                MutationType.SET_PRIVACY_POLICY_TEMPLATE,
                templates
            );
        } catch (error) {
            Logger.captureLog(error);
        }
    },
    async [ActionType.FETCH_ABOUT_TEMPLATE](
        { commit }: { commit: Function },
        resourceCode: string
    ) {
        try {
            const templates =
                await Services.Instance.domains.resourcesRepository.getResources(resourceCode);
            commit(
                MutationType.SET_ABOUT_US_TEMPLATE,
                templates
            );
        } catch (error) {
            Logger.captureLog(error);
        }
    },
    async [ActionType.FETCH_FORGOT_LINK](
        { commit }: { commit: Function },
        resourceCode: string
    ) {
        try {
            const templates =
                await Services.Instance.domains.resourcesRepository.getResources(resourceCode);
            commit(
                MutationType.SET_FORGOT_LINK,
                templates
            );
        } catch (error) {
            Logger.captureLog(error);
        }
    },
    [ActionType.SAVE_VISIBLE_DESCRIPTION](
        { commit }: { commit: Function },
        show: boolean
    ) {
        const visible = show ? 'on' : 'off';
        localStorage.setItem("Description", JSON.stringify({"description": visible}));
        commit(MutationType.SET_VISIBLE_DESCRIPTION);
    },
};

export default actions;
