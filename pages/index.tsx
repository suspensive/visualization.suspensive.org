import {
  AsyncBoundary,
  ErrorBoundary,
  Suspense,
  withResetBoundary,
} from '@suspensive/react-boundary';
import { ResetSuspenseQueryBoundary } from '@suspensive/react-query';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ComponentWithUseSuspenseQuery } from '../components';
import {
  Boundary,
  Box,
  Button,
  DescriptionText,
  ErrorDescription,
  Spacer,
  Spinner,
} from '../components/uis';
import { getAxios } from '../helper';

const BoundaryExplain = withResetBoundary(({ resetBoundary, resetBoundaryKey }) => {
  return (
    <Boundary.Area>
      <Boundary.Title>ResetBoundary</Boundary.Title>
      <Button style={{ alignSelf: 'end' }} onClick={resetBoundary}>
        ↻
      </Button>
      <Boundary.Area>
        <Boundary.Title>Suspense.CSROnly (100% Success)</Boundary.Title>
        <Suspense.CSROnly fallback={<Spinner />}>
          <ComponentWithUseSuspenseQuery
            queryKey={['alwaysSuccess', 500]}
            queryFn={alwaysSuccess500}
          />
          <ComponentWithUseSuspenseQuery
            queryKey={['alwaysSuccess', 1000]}
            queryFn={alwaysSuccess1000}
          />
          <ComponentWithUseSuspenseQuery
            queryKey={['alwaysSuccess', 1500]}
            queryFn={alwaysSuccess1500}
          />
        </Suspense.CSROnly>
      </Boundary.Area>

      <DescriptionText>+</DescriptionText>

      <QueryErrorResetBoundary>
        {({ reset: resetQueryBoundary }) => (
          <Boundary.Area>
            <Boundary.Title>ErrorBoundary (100% Error)</Boundary.Title>
            <ErrorBoundary
              onReset={resetQueryBoundary}
              resetKeys={[resetBoundaryKey]}
              fallback={({ error, reset }) => (
                <Box.Error>
                  <ErrorDescription>
                    Error: {JSON.stringify(error.message)}
                  </ErrorDescription>
                  <Button onClick={reset}>↻</Button>
                </Box.Error>
              )}
            >
              <Suspense.CSROnly fallback={<Spinner />}>
                <ComponentWithUseSuspenseQuery
                  queryKey={['error']}
                  queryFn={alwaysFailure}
                />
                <ComponentWithUseSuspenseQuery
                  queryKey={['success in error', 500]}
                  queryFn={alwaysSuccess500}
                />
              </Suspense.CSROnly>
            </ErrorBoundary>
          </Boundary.Area>
        )}
      </QueryErrorResetBoundary>

      <DescriptionText>=</DescriptionText>

      <QueryErrorResetBoundary>
        {({ reset: resetQueryBoundary }) => (
          <Boundary.Area>
            <Boundary.Title>AsyncBoundary.CSROnly (50% Success)</Boundary.Title>
            <AsyncBoundary.CSROnly
              onReset={resetQueryBoundary}
              resetKeys={[resetBoundaryKey]}
              pendingFallback={<Spinner />}
              rejectedFallback={({ error, reset }) => (
                <Box.Error>
                  <ErrorDescription>
                    Error: {JSON.stringify(error.message)}
                  </ErrorDescription>
                  <Button onClick={reset}>↻</Button>
                </Box.Error>
              )}
            >
              <ComponentWithUseSuspenseQuery
                queryKey={['async', 'halfSuccess']}
                queryFn={halfSuccess}
              />
            </AsyncBoundary.CSROnly>
          </Boundary.Area>
        )}
      </QueryErrorResetBoundary>

      <Spacer />

      <Boundary.Area>
        <Boundary.Title>ResetSuspenseQueryBoundary.CSROnly (20% Success)</Boundary.Title>
        <ResetSuspenseQueryBoundary.CSROnly
          resetKeys={[resetBoundaryKey]}
          pendingFallback={<Spinner />}
          rejectedFallback={({ error, reset }) => (
            <Box.Error>
              <ErrorDescription>Error: {JSON.stringify(error.message)}</ErrorDescription>
              <Button onClick={reset}>↻</Button>
            </Box.Error>
          )}
        >
          <ComponentWithUseSuspenseQuery
            queryKey={['async', 'almostFailure']}
            queryFn={almostFailure}
          />
        </ResetSuspenseQueryBoundary.CSROnly>
      </Boundary.Area>
    </Boundary.Area>
  );
});

export default BoundaryExplain;

const alwaysSuccess500 = getAxios({ successPercentage: 100, waitMs: 500 });
const alwaysSuccess1000 = getAxios({ successPercentage: 100, waitMs: 1000 });
const alwaysSuccess1500 = getAxios({ successPercentage: 100, waitMs: 1500 });
const halfSuccess = getAxios({ successPercentage: 50 });
const almostFailure = getAxios({ successPercentage: 20 });
const alwaysFailure = getAxios({ successPercentage: 0 });
