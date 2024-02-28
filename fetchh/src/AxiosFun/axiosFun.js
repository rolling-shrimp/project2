import axios from "axios";
class AxiosFuntion {
  post(url, obj) {
    return axios.post(url, obj);
  }
  get(url, obj) {
    return axios.get(url, { params: obj });
  }
  getOnly(url) {
    return axios.get(url);
  }
  put(url, obj) {
    return axios.put(url, obj);
  }
  delete(url, obj) {
    return axios.delete(url, obj);
  }
}
let AxiosFun = new AxiosFuntion();
export default AxiosFun;
