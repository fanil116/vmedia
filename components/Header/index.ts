import HeaderComponent from "@/components/Header/Header.vue";

export type HeaderRef = InstanceType<typeof HeaderComponent>;

export { HeaderComponent };

// TOD: probably need to relocate this enum from header
export { linkItems } from "./types/LinkItemsCollection";
