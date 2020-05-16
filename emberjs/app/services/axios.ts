import Service from '@ember/service';
import axios from 'axios'
import { inject as service, Registry as Services } from '@ember/service';
import { AxiosRequestConfig } from 'axios';

interface JsonApiError {
  title: string;
  detail: string;
  source?: {
    parameter: string;
  }
};

export interface JsonApiResponse<T = any> {
  data: T;
  meta: any;
  errors: JsonApiError[];
}

export default class AxiosService extends Service {
  @service session: Services["session"];

  public readonly agent = axios.create({ baseURL: "/" });

  constructor() {
    super(...arguments);
    this.agent.interceptors.request.use(req => {
      const { authenticator, access_token } =  this.session.data.authenticated;
      if (authenticator == "authenticator:jwt") {
        req.headers["authorization"] = `Bearer ${access_token}`
      }
      return req;
    });
    this.agent.interceptors.response.use(
      res => {
        if ('data' in res.data) {
          return res.data
        } else {
          console.error('response not in json api format', res)
          console.error('response not in json api format', res.data)
          return res.data
        }
      },
      err => {
        const o = err.response.data;
        if ('errors' in o) {
          throw o;
        } else {
          console.error('unknow error type', err)
          console.error('unknow error type', err.response)
          console.error('unknow error type', err.response.data)
          throw [{ title: "Error", detail: o.message || err.message }]
        }
      }
    );
  }
  request(conf: AxiosRequestConfig): Promise<JsonApiResponse> {
    // @ts-ignore
    return this.agent(conf);
  }
}


declare module '@ember/service' {
  interface Registry {
    axios: AxiosService;
  }
}
