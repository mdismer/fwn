/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { FactionListDto } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Factions<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Factions
   * @name FactionsList
   * @request GET:/factions
   * @secure
   */
  factionsList = (
    query?: {
      /** @format uuid */
      CampaignId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FactionListDto[], any>({
      path: `/factions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
}
