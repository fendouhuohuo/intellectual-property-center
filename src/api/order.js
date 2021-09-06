import service from '@/utils/request'

export function getOrder(page,query) {               // 需求列表页,data是查询条件的请求体内容
  return service({
    url: `/stcsp/order/admin/list/${page}`,
    method: 'POST',
    data:query
  })
}
export function getOrderDetail(orderId) {               // 需求列表页,data是查询条件的请求体内容
  return service({
    url: `/stcsp/order/getOrderInfo/${orderId}`,
    method: 'GET'
  })
}

