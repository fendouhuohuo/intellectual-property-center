import service1 from '@/utils/request1'
export function getReqList(page,limit,query) {               // 流程模板列表页,data是查询条件的请求体内容
    return service1({
      url: `/stcsp/flow/getAllFlow/${page}/${limit}`,
      method: 'POST',
      data:query
    })
  }
export function getStepsName(id){
  return service1({
    url: `/stcsp/flow/getNodeById/${id}`,
    method: 'GET',
  })
}
export function addflowModel(model){
  return service1({
    url: `/stcsp/flow/add`,
    method: 'POST',
    data: model
  })
}
export function updateNode(query){
  return service1({
    url: `/stcsp/flow/update`,
    method: 'PUT',
    data: query
  })
}
export function getAllCategory(){
  return service1({
    url: `/stcsp/category/getCategory`,
    method: 'GET'
  })
}
export function delModel(id){
  return service1({
    url: `/stcsp/flow/delete/${id}`,
    method: 'DELETE'
  })
}