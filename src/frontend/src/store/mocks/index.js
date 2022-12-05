import { cloneDeep } from 'lodash';

import { getters } from '@/store';
import { mutations } from '@/store';
import modules from '@/store/modules';
import Vuex from 'vuex';

import VuexPlugins from '@/plugins/vuexPlugins';

const initState = () => ({});

export const generateMockStore = actions => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: initState(),
    getters,
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins]
  });
};