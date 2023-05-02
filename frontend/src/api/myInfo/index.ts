import axiosInstance from '@/libs/request';
import { API_URLS } from '@/constants';
import { IApiResponse } from '@/types/api';

interface IGetAuthorizeUrlParams {
  callback?: string;
}

interface IGetAuthorizeUrlResponse {
  authorizeUrl: string;
}

interface IGetPersonInfoParams {
  code: string;
  state?: string;
}

interface ICommonInfoWValue {
  lastupdated: string;
  source: string;
  classification: string;
  value: string;
}

interface ICommonInfoWCode extends Omit<ICommonInfoWValue, 'value'> {
  code: string;
  desc: string;
}

interface ICommonValueData {
  value: string;
}

interface IMobileInfo extends Pick<ICommonInfoWValue, 'lastupdated' | 'source' | 'classification'> {
  areacode: ICommonValueData;
  prefix: ICommonValueData;
  nbr: ICommonValueData;
}

interface IAddressInfo extends Pick<ICommonInfoWValue, 'lastupdated' | 'source' | 'classification'> {
  country: {
    code: string;
    desc: string;
  };
  unit: ICommonValueData;
  street: ICommonValueData;
  block: ICommonValueData;
  postal: ICommonValueData;
  floor: ICommonValueData;
  type: string;
  building: ICommonValueData;
}

interface ICpfContributionHistory {
  date: ICommonValueData;
  employer: ICommonValueData;
  amount: ICommonValueData;
  month: ICommonValueData;
}

export interface ICpfContributionInfo extends Pick<ICommonInfoWValue, 'lastupdated' | 'source' | 'classification'> {
  history?: ICpfContributionHistory[];
}

export interface ICpfBalanceInfo extends Pick<ICommonInfoWValue, 'lastupdated' | 'source' | 'classification'> {
  oa?: ICommonValueData;
  ma?: ICommonValueData;
  sa?: ICommonValueData;
  ra?: ICommonValueData;
}

export interface INOAHistory {
  amount: ICommonValueData;
  trade: ICommonValueData;
  interest: ICommonValueData;
  yearofassessment: ICommonValueData;
  taxclearance: ICommonValueData;
  employment: ICommonValueData;
  rent: ICommonValueData;
  category: ICommonValueData;
}

interface INOAHistoryInfo extends Pick<ICommonInfoWValue, 'lastupdated' | 'source' | 'classification'> {
  noas?: INOAHistory[];
}

export interface IPersonInfo {
  employmentsector: ICommonInfoWValue;
  uinfin: ICommonInfoWValue;
  name: ICommonInfoWValue;
  sex: ICommonInfoWCode;
  race: ICommonInfoWCode;
  nationality: ICommonInfoWCode;
  dob: ICommonInfoWValue;
  email: ICommonInfoWValue;
  mobileno: IMobileInfo;
  regadd: IAddressInfo;
  housingtype: ICommonInfoWCode;
  hdbtype: ICommonInfoWCode;
  marital: ICommonInfoWCode;
  edulevel: ICommonInfoWCode;
  ownerprivate: ICommonInfoWValue;
  cpfcontributions: ICpfContributionInfo;
  cpfbalances: ICpfBalanceInfo;
  birthcountry: ICommonInfoWCode;
  residentialstatus: ICommonInfoWCode;
  aliasname: ICommonInfoWValue;
  marriedname: ICommonInfoWValue;
  passtype: ICommonInfoWCode;
  noahistory: INOAHistoryInfo;
}

export default {
  getAuthorizeUrl: (params: IGetAuthorizeUrlParams): Promise<IApiResponse<IGetAuthorizeUrlResponse>> =>
    axiosInstance.get(API_URLS.AUTHORIZE_URL, { params }),
  getPersonInfo: (params: IGetPersonInfoParams): Promise<IApiResponse<IPersonInfo>> =>
    axiosInstance.post(API_URLS.PERSON_INFO, params),
  getPersonInfoSample: (params: IGetPersonInfoParams): Promise<IApiResponse<IPersonInfo>> =>
    axiosInstance.post(API_URLS.PERSON_INFO_SAMPLE, params)
};
