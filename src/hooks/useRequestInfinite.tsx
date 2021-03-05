import { SWRInfiniteConfigInterface, SWRInfiniteResponseInterface, useSWRInfinite } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export type RequestType = AxiosRequestConfig | null

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRInfiniteConfigInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data[]
}


export default function useRequestInfinite<Data = unknown, Error = unknown>(
  request: (
    pageIndex: number,
    previousPageData: AxiosResponse<Data> | null
  ) => RequestType,
  { initialData, ...config }: Config<Data, Error> = {}
) {
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
    data: response && response.map((res) => res.data).flat(),
    size,
    setSize,
    mutate,
    error,
    revalidate,
    isValidating,
    response
  }

}