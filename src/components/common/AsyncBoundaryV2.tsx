import {
  Suspense,
  useImperativeHandle,
  useRef,
  type Ref,
  type ReactElement,
  type SuspenseProps,
} from 'react'
import { ErrorBoundary, type ErrorBoundaryProps } from 'react-error-boundary'

export interface AsyncBoundarySharedProps
  extends Omit<SuspenseProps, 'fallback'>,
    Omit<
      ErrorBoundaryProps,
      'fallback' | 'FallbackComponent' | 'fallbackRender'
    > {
  loadingFallback?: SuspenseProps['fallback']
  errorFallback: NonNullable<
    ErrorBoundaryProps['fallback'] | ErrorBoundaryProps['fallbackRender']
  >
}

function AsyncBoundary({
  ref: resetRef,
  loadingFallback,
  errorFallback,
  children,
  ...errorBoundaryProps
}: AsyncBoundarySharedProps & { ref?: Ref<{ reset(): void }> }): ReactElement {
  const ref = useRef<ErrorBoundary>(null)
  useImperativeHandle(
    resetRef,
    () => ({
      reset: () => ref.current?.resetErrorBoundary(),
    }),
    []
  )

  return (
    <ErrorBoundary
      {...errorBoundaryProps}
      {...(typeof errorFallback === 'function'
        ? { fallbackRender: errorFallback }
        : { fallback: errorFallback })}
      ref={ref}
    >
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default AsyncBoundary
