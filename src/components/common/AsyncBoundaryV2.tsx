import React, {
  Suspense,
  forwardRef,
  useImperativeHandle,
  useRef,
  type PropsWithoutRef,
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

const AsyncBoundary = forwardRef<
  { reset(): void },
  PropsWithoutRef<AsyncBoundarySharedProps>
>(function AsyncBoundary(props, resetRef): ReactElement {
  const { loadingFallback, errorFallback, children, ...errorBoundaryProps } =
    props

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
})

export default AsyncBoundary
