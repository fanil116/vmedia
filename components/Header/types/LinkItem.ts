import { LinkItemCode } from "./enums/link-item-code";

export class LinkItem {
    constructor(
        public readonly title: string,
        public readonly code: LinkItemCode,
        public readonly routerPath: string,
        public readonly icon: string | null = null
    ) {}
}
