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

import { CreateWorld, CreateWorldResult, WorldListDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Worlds<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Worlds
   * @name WorldsList
   * @request GET:/worlds
   * @secure
   */
  worldsList = (
    query?: {
      /** @format uuid */
      CampaignId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorldListDto[], any>({
      path: `/worlds`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Worlds
   * @name WorldsCreate
   * @request POST:/worlds
   * @secure
   */
  worldsCreate = (data: CreateWorld, params: RequestParams = {}) =>
    this.request<CreateWorldResult, any>({
      path: `/worlds`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
