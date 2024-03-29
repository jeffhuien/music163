import loadingStore from '@/stores/loading'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { toast } from '../toast'
let loading = loadingStore()

export default class Axios {
  protected instance
  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config) //初始化axios
    this.interceptors() //拦截器
  }

  public async request<T>(config: AxiosRequestConfig) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config)
        resolve(response.data)
      } catch (error: AxiosError | any) {
        toast.error(error.message)
        reject(error)
      }
    })
  }

  private interceptors() {
    this.interceptorsRequest() //请求拦截器
    this.interceptorsResponse() //响应拦截器
    // throw new Error("Method not implemented.");
  }

  private interceptorsRequest() {
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        switch (config.url) {
          case '/search/suggest': {
            loading.searchBoxLoading = true
          }
          case '1': {
          }
        }
        return config
      },
      function (error) {
        // 对请求错误做些什么
        console.log('出错了')

        return Promise.reject(error)
      },
    )
  }

  private interceptorsResponse() {
    // 添加响应拦截器
    this.instance.interceptors.response.use(
      function (response) {
        if (response.data.code >= 400) toast.error('服务错误~')

        // 对响应数据做点什么
        loading.searchBoxLoading = false
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response
      },
      function (error) {
        console.log(error)

        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
      },
    )
  }
}
