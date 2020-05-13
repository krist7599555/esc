import Service from '@ember/service';
import axios from 'axios'
import { inject as service } from '@ember/service';
// import qs from 'qs';

export default class AxiosService extends Service {
  @service session;

  constructor() {
    super(...arguments);
    this.agent = axios.create({
      baseURL: "/",
    });
    this.agent.interceptors.request.use((req) => {
      console.log("AxiosService -> constructor -> this.session.data", this.session.data)
      const { authenticator, access_token } =  this.session.data.authenticated;
      // req.headers['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      if (authenticator == "authenticator:jwt") {
        req.headers["Authorization"] = `Bearer ${access_token}`
      }
      // if (req.data) {
      //   req.data = qs.stringify(req.data)
      // }
      return req;
    })
    this.agent.interceptors.response.use((res) => {
      return res.data.data;
    }, err => {
      const data = err.response.data;
      if ('errors' in data) {
        throw data.errors
      } else {
        throw [{type: "Error", detail: data.message || err.message }]
      }
    })
  }
  request(conf) {
    console.log("AxiosService -> request -> conf", conf)
    return this.agent(conf)
  }
}
