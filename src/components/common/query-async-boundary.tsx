import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type Ref } from 'react'

import AsyncBoundary, {
  type AsyncBoundarySharedProps,
} from './async-boundary-v2'

function QueryAsyncBoundary({
  resetKeys,
  onReset,
  ref: resetRef,
  ...props
}: AsyncBoundarySharedProps & { ref?: Ref<{ reset(): void }> }) {
  return (
    <QueryErrorResetBoundary key={(resetKeys ?? []).join()}>
      {({ reset }) => (
        <AsyncBoundary
          {...props}
          onReset={details => {
            onReset?.(details)
            reset()
          }}
          ref={resetRef}
        />
      )}
    </QueryErrorResetBoundary>
  )
}

export default QueryAsyncBoundary
