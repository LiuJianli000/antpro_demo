import { deleteMock, testMock, updateMock, addMock } from '@/services/api'

export default {
  namespace: 'testMock',
  state: {
    list: []
  },
  
  effects: {
    *fetch({ payload }, { call }) {
      const res = yield call(testMock, payload)
      
      return res
    },
    *delete({ payload }, { call }) {
      const res = yield call(deleteMock, payload)

      return res
    },
    *update({ payload }, { call }) {
      const res = yield call(updateMock, payload)

      return res
    },
    *add({ payload }, { call }) {
      const res = yield call(addMock, payload)

      return res
    }
  },
  
  reducers: {}
}