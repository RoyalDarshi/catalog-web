/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CatalogApproverInfo } from './CatalogApproverInfo';

export type CatalogStatusLogDTO = {
    catalogStatusLogId?: string;
    comment?: string;
    createdDate?: string;
    action?: string;
    buyerMainCatalogId?: string;
    userId?: string;
    catalogApproverInfo?: Array<CatalogApproverInfo>;
};
