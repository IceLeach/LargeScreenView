import request from "@/utils/request";
import * as i from '@/types';

export async function cmdbBizRoomConfigurationGetTreeListGet(): Promise<i.CmdbBizRoomConfigurationGetTreeListGetRes> {
  return request('/cmdb/biz/roomConfiguration/getTreeList', {
    method: 'GET',
  });
}

// 数据字典字典数据查询
export async function smSystemDictDataTypeDictTypeGet(params: i.SmSystemDictDataTypeDictTypeGetParams): Promise<i.SmSystemDictDataTypeDictTypeGetRes> {
  return request(`/sm/system/dict/data/type/${params.dictType}`, {
    method: 'GET',
    baseURL: 'http://60.12.212.225:8186',
  });
}
