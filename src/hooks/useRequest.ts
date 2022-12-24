import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

export type ExtendErrorType = {
  status?: number;
  info?: string;
  message?: string;
};
export type RequestType = AxiosRequestConfig | null;

export interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error> & ExtendErrorType>,
    'isValidating' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
  isLoading: boolean;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: RequestType,
  axios: AxiosInstance,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error> & ExtendErrorType>(
    request && JSON.stringify(request),
    () =>
      axios(request!).catch(e => {
        const error = new Error(
          `!!Error => url: ${request?.url} fetching the data`
        ) as any;
        if (e.response) {
          error.status = e.response.status;
          error.info = e.response.data;
        } else if (e.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(e.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          error.message = e.response.message;
        }
        throw error;
      }),
    {
      ...config,
      fallbackData: fallbackData && {
        status: 200,
        statusText: 'InitialData',
        config: request!,
        headers: {},
        data: fallbackData,
      },
    }
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    mutate,
    isLoading: !response?.data && !error,
  };
}
