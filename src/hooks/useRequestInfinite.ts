import { SWRInfiniteConfiguration, SWRInfiniteResponse, useSWRInfinite } from 'swr'
import { AxiosInstance ,AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export type RequestType = AxiosRequestConfig | null

interface Return<Data, Error>
  extends Pick<
    SWRInfiniteResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error' | 'mutate' | 'size' | 'setSize'
  > {
  data: Data[] | undefined
  response: AxiosResponse<Data>[] | undefined
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRInfiniteConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data[]
}


export default function useRequestInfinite<Data = unknown, Error = unknown>(
  request: (
    pageIndex: number,
    previousPageData: AxiosResponse<Data> | null
  ) => RequestType,
  axios: AxiosInstance,
  { initialData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const { 
    data: response,
    size,
    setSize, 
    mutate,
    isValidating,
    revalidate,
    error 
  } = useSWRInfinite<AxiosResponse<Data>, AxiosError<Error>>(
    (pageIndex, previousPageData) => {
      const key = request(pageIndex, previousPageData)
      return key ? JSON.stringify(key) : null
    }, 
    (request) => axios(JSON.parse(request)),
    {
      ...config,
      initialData:
        initialData?.map((v) => ({
          status: 200,
          statusText: 'InitialData',
          config: {},
          headers: {},
          data: v
        })),
    }
  )
  
  return {
    data: Array.isArray(response) ? response.map((res) => res.data) : undefined,
    size,
    setSize,
    mutate,
    error,
    revalidate,
    isValidating,
    response
  }

}