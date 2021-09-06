import service from '@/utils/request'   //端口为8001的请求
import service1 from '@/utils/request1'   //端口为8003的请求

export function getAllReqList(page,limit,query) {               // 需求列表页,data是查询条件的请求体内容
  return service1({
    url: `/stcsp/requirement/getRequiresByCondition/${page}/${limit}`,
    method: 'POST',
    data:query
  })
}
export function getAllSubReqList(page,limit,query) {               // 需求列表页,data是查询条件的请求体内容
  return service1({
    url: `/stcsp/subRequire/getAllSubRequires/${page}/${limit}`,
    method: 'POST',
    data:query
  })
}
export function getReqDetailById(id) {               // 需求列表页,data是查询条件的请求体内容
  return service1({
    url: `/stcsp/requirement/getRequireDetailById/${id}`,
    method: 'GET'
  })
}
export function getfuwu(page,limit,query) {               // 需求列表页,data是查询条件的请求体内容
  return service1({
    url: `/stcsp/combine-serves/getAllCombineServes/${page}/${limit}`,
    method: 'POST',
    data:query
  })
}

// 详情查询
export function getDetails(id) {
  console.log(id) // 能获取到id值
  return service1({
    url: `/stcsp/requirement/getRequireDetailById/${id}`,
    method: 'GET',
  })
}

export function getSubReqDetail(id) {
  return service1({
    url: `/stcsp/subRequire/getSubRequireInfo/${id}`,
    method: 'GET',
  })
}

export function chaifen(query) {
  console.log() // 能获取到id值
  return service1({
    url: `/stcsp/subRequire/addSubRequire`,
    method: 'POST',
    data:query
  })
}
export function fenfa(id) {
  console.log() // 能获取到id值
  return service1({
    url: `/stcsp/subRequire/getAllSubRequirementById/${id}`,
    method: 'GET'
  })
}

export function getcate() {
  console.log() // 能获取到id值
  return service({
    url: `/stcsp/category/getCategory`,
    method: 'GET'
  })
}

// 分发需求,post请求,请求体中是一个数组,数组中的每一项的内容包括categoryId为分类id,id是需求id
export function dispense(send) {
  return service1({
    url: `/stcsp/requirement/requireDistribution`,
    method: 'POST',
    data:send
  })
}

export function del(send) {
  return service1({
    url: `/stcsp/combine-serves/deleteCombineServe`,
    method: 'POST',
    data:send
  })
}
export function wanc(send) {
  return service1({
    url: `/stcsp/arrange/add`,
    method: 'POST',
    data:send
  })
}
export function tothird(send) {
  return service1({
    url: `/stcsp/subRequire/sendSubRequireToThird`,
    method: 'POST',
    data:send
  })
}
export function cf(send) {
  return service1({
    url: `/stcsp/subRequire/addNewSubRequire`,
    method: 'POST',
    data:send
  })
}

export function matchdata(requirementId) {
  return service1({
    url: `/stcsp/layout/getResult/${requirementId}`,
    method: 'GET'
  })
}

export function getbynid(nid) {
  return service1({
    url: `/stcsp/layout/getResult/${requirementId}`,
    method: 'GET'
  })
}
