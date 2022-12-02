import { ComponentProps } from 'react'
import { ErrorBoundary } from '@suspensive/react'
import { Box, Button, Description } from './uis'

export const RejectedFallback: ComponentProps<typeof ErrorBoundary>['fallback'] = ({ error, reset }) => (
  <Box.Error>
    <Description.Error>Error: {JSON.stringify(error.message)}</Description.Error>
    <Button onClick={reset}>↻</Button>
  </Box.Error>
)
