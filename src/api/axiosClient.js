import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/OUAdmissions";
const SERVER = "http://localhost:8088";

export const endpoints = {
  banner: `${SERVER_CONTEXT}/api/listBanner`,
  type: `${SERVER_CONTEXT}/api/type`,
  postInfo: `${SERVER_CONTEXT}/api/post_info/`,
  post1: `${SERVER_CONTEXT}/api/getList5Post/1`,
  post2: `${SERVER_CONTEXT}/api/getList5Post/2`,
  post3: `${SERVER_CONTEXT}/api/getList5Post/3`,
  post4: `${SERVER_CONTEXT}/api/getList5Post/4`,
  post5: `${SERVER_CONTEXT}/api/getList5Post/5`,
  posts: `${SERVER_CONTEXT}/api/listPost`,
  postByType: `${SERVER_CONTEXT}/api/getPostByType/`,
  username: `${SERVER_CONTEXT}/api/username/`,
  departs: `${SERVER_CONTEXT}/api/departments/listDepartment`,
  departInfo: `${SERVER_CONTEXT}/api/departments/department_info/`,
  login: `${SERVER_CONTEXT}/api/login/`,
  "current-user": `${SERVER_CONTEXT}/api/current-user/`,
  "register-user": `${SERVER_CONTEXT}/api/register-user/`,
  commentByPost: `${SERVER_CONTEXT}/api/listCommentByPost/`,
  addComment: `${SERVER_CONTEXT}/api/comments/`,
  updateComment: (questionId) => `${SERVER_CONTEXT}/api/comments/${questionId}`,
  deleteComment: (questionId) => `${SERVER_CONTEXT}/api/comments/${questionId}`,
  liveStreams: `${SERVER_CONTEXT}/api/livestreams/`,
  liveInfo: `${SERVER_CONTEXT}/api/live_info/`,
  listQuestions: `${SERVER_CONTEXT}/api/questions/`,
  addQuestion: `${SERVER_CONTEXT}/api/questions/`,
  date: `${SERVER_CONTEXT}/api/questions/getdate`,
  listQuestionsForLive: `${SERVER_CONTEXT}/api/questionsForLive/`,
  deleteQuestion: (questionId) =>
    `${SERVER_CONTEXT}/api/questions/${questionId}`,
  updateQuestion: (questionId) =>
    `${SERVER_CONTEXT}/api/questions/${questionId}`,
  questionInfo: (quesId) => `${SERVER_CONTEXT}/api/questions/${quesId}`,
  questions: (liveId) => `${SERVER_CONTEXT}/api/live_info/${liveId}/questions`,
  "change-password": `${SERVER_CONTEXT}/api/change-password/`,
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
