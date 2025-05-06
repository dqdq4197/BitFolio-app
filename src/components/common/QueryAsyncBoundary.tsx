import { QueryErrorResetBoundary } from '@tanstack/react-query'
import React, {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react'

import AsyncBoundary from './AsyncBoundaryV2'

const QueryAsyncBoundary = forwardRef<
  ComponentRef<typeof AsyncBoundary>,
  ComponentPropsWithoutRef<typeof AsyncBoundary>
>(function QueryAsyncBoundary({ resetKeys, onReset, ...props }, resetRef) {
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
})

export default QueryAsyncBoundary
