import api from '../utils/api';
import {
  searchArticlesURL,
  topHeadlinesURL
} from '@/utils/constants';

const initialState = {

};

export default {

  namespace: 'newsAPIModel',
  state: { ...initialState },

  subscriptions: {},

  effects: {
    * getHeadlines({ articles }, { call, put, select }) {
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
    * searchArticles({ articles }, { call, put, select }) {
      try {
        const headlinesParams = {
          text: articles.text,
        };
        const result = yield call(api.get, searchArticlesURL+'?qInTitle='+headlinesParams.text);
        if (result.status === 200) {

          yield put({ type: 'updateState', payload: { topHeadlines: result.data } });
        }
      } catch (e) {
        console.log(e);
      }
    },
    * newsPapers({ articles }, { call, put, select }) {
      try {
        const headlinesParams = {
          domain:articles.domain
        };
        const result = yield call(api.get, searchArticlesURL+'?domains='+headlinesParams.domain);
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
