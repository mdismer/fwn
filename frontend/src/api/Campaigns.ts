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

import { CreateCampaign, CreateCampaignResult, GetCampaignsResult } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Campaigns<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Campaign
   * @name CampaignsList
   * @request GET:/campaigns
   * @secure
   */
  campaignsList = (params: RequestParams = {}) =>
    this.request<GetCampaignsResult[], any>({
      path: `/campaigns`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Campaign
   * @name CampaignsCreate
   * @request POST:/campaigns
   * @secure
   */
  campaignsCreate = (data: CreateCampaign, params: RequestParams = {}) =>
    this.request<CreateCampaignResult, any>({
      path: `/campaigns`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
