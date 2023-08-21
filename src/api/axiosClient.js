import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/OUAdmissions";
const SERVER = "http://localhost:8088";

export const endpoints = {
  type: `${SERVER_CONTEXT}/api/types/type`,
  postInfo: `${SERVER_CONTEXT}/api/posts/post_info/`,
  post1: `${SERVER_CONTEXT}/api/posts/getList5Post/1`,
  post2: `${SERVER_CONTEXT}/api/posts/getList5Post/2`,
  post3: `${SERVER_CONTEXT}/api/posts/getList5Post/3`,
  post4: `${SERVER_CONTEXT}/api/posts/getList5Post/4`,
  post5: `${SERVER_CONTEXT}/api/posts/getList5Post/5`,
  posts: `${SERVER_CONTEXT}/api/posts/listPost`,
  postByType: `${SERVER_CONTEXT}/api/posts/getPostByType/`,
  departs: `${SERVER_CONTEXT}/api/departments/listDepartment`,
  departInfo: `${SERVER_CONTEXT}/api/departments/department_info/`,
  login: `${SERVER_CONTEXT}/api/login/`,
  "current-user": `${SERVER_CONTEXT}/api/current-user/`,
};

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
