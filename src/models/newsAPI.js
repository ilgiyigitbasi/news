import api from '../utils/api';
import {
  topHeadlinesURL
} from '@/utils/constants';

const initialState = {

};

export default {

  namespace: 'newsAPIModel',
  state: { ...initialState },

  subscriptions: {},

  effects: {
    * getHeadlines({ uuid }, { call, put, select }) {
      try {
        const headlinesParams = {
          country: 'TR',
        };
        const result = yield call(api.get, topHeadlinesURL+'?country='+headlinesParams.country);
        if (result.status === 200) {

          yield put({ type: 'updateState', payload: { topHeadlines: result.data } });
        }
      } catch (e) {
        console.log(e);
      }
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    reset() {
      return { ...initialState };
    },
  },
};
