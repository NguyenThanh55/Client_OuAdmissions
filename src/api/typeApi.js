import axiosClient from "./axiosClient";

const typeApi = {
    getAll(params) {
        const url = '/api/type';
        return axiosClient.get(url, {params: params});
    },
};

export default typeApi;