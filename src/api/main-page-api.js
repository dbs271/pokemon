const { axiosInstance } = require("./@core/axiosInstance");

const GetList = (API_KEY, pageParam) => {
  return axiosInstance.get(API_KEY, {
    params: {
      page: pageParam,
    },
  });
};

const POKE_API = {
  GetList,
};

export default POKE_API;
