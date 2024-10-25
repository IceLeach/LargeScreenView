import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { smSystemDictDataTypeDictTypeGet } from '@/services';

type DictionaryType = Record<string, { label: string; value: string }[]>;

export const state = proxy<DictionaryType>({});

export const getDictionary = async (type: string) => {
  if (state[type]) {
    return state[type];
  } else {
    try {
      const res = await smSystemDictDataTypeDictTypeGet({ dictType: type });
      if (res.data) {
        state[type] = res.data.map(d => ({ label: d.dictLabel, value: d.dictValue }));
        return state[type];
      }
      return [];
    } catch (e) {
      return [];
    }
  }
}

devtools(state, { name: 'dictionary', enabled: true });
