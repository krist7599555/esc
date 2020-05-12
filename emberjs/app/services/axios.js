import Service from '@ember/service';
import axios from 'axios'
import { inject as service } from '@ember/service';

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
      if (authenticator == "authenticator:jwt") {
        req.headers["Authorization"] = `Bearer ${access_token}`
      }
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
