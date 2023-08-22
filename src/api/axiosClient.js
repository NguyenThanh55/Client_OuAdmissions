import axios from "axios";

const SERVER_CONTEXT = "/OUAdmissions";

export const endpoints = {
  type: `${SERVER_CONTEXT}/api/type`,
  postInfo: `${SERVER_CONTEXT}/api/post_info/` ,
  post1: `${SERVER_CONTEXT}/api/getList5Post/1`,
  post2: `${SERVER_CONTEXT}/api/getList5Post/2`,
  post3: `${SERVER_CONTEXT}/api/getList5Post/3`,
  post4: `${SERVER_CONTEXT}/api/getList5Post/4`,
  post5: `${SERVER_CONTEXT}/api/getList5Post/5`,
  departs: `${SERVER_CONTEXT}/api/listDepartment`,
};


export default axios.create({
  baseURL: "http://localhost:8080"
});
