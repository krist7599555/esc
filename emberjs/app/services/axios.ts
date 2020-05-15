import Service from '@ember/service';
import axios, { AxiosInstance } from 'axios'
import { inject as service } from '@ember/service';
// import qs from 'qs';
import { AxiosRequestConfig } from 'axios';

export default class AxiosService extends Service {
  @service session;

  agent: AxiosInstance;

  constructor() {
    super(...arguments);
    this.agent = axios.create({
      baseURL: "/",
    });
    this.agent.interceptors.request.use((req) => {
      const { authenticator, access_token } =  this.session.data.authenticated;
      if (authenticator == "authenticator:jwt") {
        req.headers["Authorization"] = `Bearer ${access_token}`
      }
      return req;
    })
    this.agent.interceptors.response.use((res) => {
      return res.data;
    }, err => {
      const o = err.response.data;
      if ('errors' in o) {
        throw o;
      } else {
        console.error('unknow error type', err)
        console.error('unknow error type', err.response)
        console.error('unknow error type', err.response.data)
        throw [{type: "Error", detail: o.message || err.message }]
      }
    })
  }
  request(conf: AxiosRequestConfig) {
    console.log("AxiosService -> request -> conf", conf)
    return this.agent(conf)
  }
}


declare module '@ember/service' {
  interface Registry {
    axios: AxiosService;
  }
}
