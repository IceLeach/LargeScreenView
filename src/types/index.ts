export interface ApiCommonRes<T> {
  code: number;
  message: string;
  data: T;
}

export type CmdbBizRoomConfigurationGetTreeListGetResData = {
  id: string;
  name: string;
  children: {
    id: number;
    name: string;
    type: string;
    icon: string;
  }[];
}[];

export type CmdbBizRoomConfigurationGetTreeListGetRes = ApiCommonRes<CmdbBizRoomConfigurationGetTreeListGetResData>;

export interface SmSystemDictDataTypeDictTypeGetParams {
  dictType: string;
}

export type SmSystemDictDataTypeDictTypeGetResData = {
  dictCode: number;
  dictLabel: string;
  dictValue: string;
}[];

export type SmSystemDictDataTypeDictTypeGetRes = ApiCommonRes<SmSystemDictDataTypeDictTypeGetResData>;
