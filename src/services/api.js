import request from '@/utils/request';

export async function testMock(params) {
  return request('/api/test', {
    params,
  });
}

export async function deleteMock(params) {
  return request('/api/test', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}

export async function updateMock(params) {
  return request('/api/test', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
export async function addMock(params) {
  return request('/api/test', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}