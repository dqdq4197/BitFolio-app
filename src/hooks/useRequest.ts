import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export type RequestType = AxiosRequestConfig | null

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error' | 'mutate'
  > {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined,
  isLoading: boolean
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: RequestType,
  axios: AxiosInstance,
  { initialData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const { data: response, error, isValidating, revalidate, mutate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
  >(
    request && JSON.stringify(request),
    () => axios(request!),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        config: request!,
        headers: {},
        data: initialData
      }
    }
  )

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate,
    isLoading: !response?.data && !error,
  }
}