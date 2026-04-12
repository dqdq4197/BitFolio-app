import ky, {
  type Input,
  type KyInstance,
  type Options,
  type SearchParamsOption,
} from 'ky'

const createHttpClient = (kyInstance: KyInstance = ky) => {
  const request = <RequestType, ResponseType>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: Input,
    payload?: RequestType,
    options?: Options
  ): Promise<ResponseType> => {
    return kyInstance[method]<ResponseType>(url, {
      ...(payload ? { json: payload } : {}),
      ...options,
    }).json()
  }

  return {
    extend: (
      defaultOptions: Options | ((parentOptions: Options) => Options)
    ) => {
      const extendedKy = kyInstance.extend(defaultOptions)
      return createHttpClient(extendedKy)
    },

    getRequest: <RequestType, ResponseType>(
      url: Input,
      params?: SearchParamsOption,
      options?: Options
    ) =>
      request<RequestType, ResponseType>('get', url, undefined, {
        searchParams: params,
        ...options,
      }),

    postRequest: <RequestType, ResponseType>(
      url: Input,
      payload?: RequestType,
      options?: Options
    ) => request<RequestType, ResponseType>('post', url, payload, options),

    putRequest: <RequestType, ResponseType>(
      url: Input,
      payload?: RequestType,
      options?: Options
    ) => request<RequestType, ResponseType>('put', url, payload, options),

    deleteRequest: <RequestType, ResponseType>(
      url: Input,
      payload?: RequestType,
      options?: Options
    ) => request<RequestType, ResponseType>('delete', url, payload, options),

    patchRequest: <RequestType, ResponseType>(
      url: Input,
      payload?: RequestType,
      options?: Options
    ) => request<RequestType, ResponseType>('patch', url, payload, options),
  }
}

export default createHttpClient
