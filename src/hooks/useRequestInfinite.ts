import useSWRInfinite, {
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
} from 'swr/infinite';
import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

export type RequestType = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
  SWRInfiniteResponse<AxiosResponse<Data>, AxiosError<Error>>,
  'isValidating' | 'error' | 'mutate' | 'size' | 'setSize'
  > {
  data: Data[] | undefined;
  response: AxiosResponse<Data>[] | undefined;
  isLoading: boolean;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
  SWRInfiniteConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
  'fallbackData'
  > {
  fallbackData?: Data[];
}

export default function useRequestInfinite<Data = unknown, Error = unknown>(
  request: (
    pageIndex: number,
    previousPageData: AxiosResponse<Data> | null
  ) => RequestType,
  axios: AxiosInstance,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    size,
    setSize,
    mutate,
    isValidating,
    error,
  } = useSWRInfinite<AxiosResponse<Data>, AxiosError<Error>>(
    (pageIndex, previousPageData) => {
      const key = request(pageIndex, previousPageData);

      return key ? JSON.stringify(key) : null;
    },
    (request: any) => axios(JSON.parse(request)),
    {
      ...config,
      fallbackData: fallbackData?.map(v => ({
        status: 200,
        statusText: 'InitialData',
        config: {},
        headers: {},
        data: v,
      })),
    }
  );
  return {
    data: Array.isArray(response) ? response.map(res => res.data) : undefined,
    size,
    setSize,
    mutate,
    error,
    isValidating,
    response,
    isLoading:
      (!response && !error) ||
      (size > 0 &&
        response !== undefined &&
        typeof response[size - 1] === 'undefined'),
  };
}
