import service1 from '@/utils/request1'

export function getAllMessage(page, limit,belong) { // 需求列表页,data是查询条件的请求体内容
  return service1({
    url: `/stcsp/message/getExpertMessage/${page}/${limit}/${belong}`,
    method: 'GET'
  })
}
export function getNotReadMessage(page, limit, isRead,belong) { // 需求列表页,data是查询条件的请求体内容
  return service1({
    url: `/stcsp/message/getExpertMessage/${page}/${limit}/${isRead}/${belong}`,
    method: 'GET'
  })
}

export function changeState(id) {
  return service1({
    url: `/stcsp/message/changeStatus/${id}`,
    method: 'GET'
  })
}

export function deleteInform(id) { // 需求列表页,data是查询条件的请求体内容
  return service1({
    url: `/stcsp/message/deleteMessage/${id}`,
    method: 'DELETE'
  })
}