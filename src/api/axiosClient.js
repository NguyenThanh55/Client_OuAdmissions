import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/OUAdmissions";
const SERVER = "http://localhost:8088";

export const endpoints = {
  type: `${SERVER_CONTEXT}/api/type`,
  postInfo: `${SERVER_CONTEXT}/api/post_info/` ,
  post1: `${SERVER_CONTEXT}/api/getList5Post/1`,
  post2: `${SERVER_CONTEXT}/api/getList5Post/2`,
  post3: `${SERVER_CONTEXT}/api/getList5Post/3`,
  post4: `${SERVER_CONTEXT}/api/getList5Post/4`,
  post5: `${SERVER_CONTEXT}/api/getList5Post/5`,
  departs: `${SERVER_CONTEXT}/api/listDepartment`,

}
export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      Authorization: cookie.load("token"),
    },
  });
};


export default axios.create({
  baseURL: SERVER,
});
