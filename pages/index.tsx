import { useResetBoundary, withResetBoundary } from '../libs/react-boundary';
import { useQuery } from '@tanstack/react-query';
import { ResetSuspenseQueryBoundary } from '../libs/react-suspense-query';

const Home = withResetBoundary(() => {
  const { reset, resetKey } = useResetBoundary();

  return (
    <>
      <div>
        <button onClick={reset}>reset</button>
      </div>
      <ResetSuspenseQueryBoundary.SSRSafe
        resetKeys={[resetKey]}
        pendingFallback={<>AsyncBoundary Loading...</>}
        rejectedFallback={({ error, reset }) => <button onClick={reset}> {JSON.stringify(error)} error...</button>}
      >
        <AsyncComponent />
      </ResetSuspenseQueryBoundary.SSRSafe>
    </>
  );
});

const AsyncComponent = () => {
  const query = useQuery(
    ['test'] as const,
    async () => {
      const { data } = await axiosLike();

      return data;
    },
    {
      suspense: true,
    }
  );

  if (query.isSuccess) {
    return <>{query.data}</>;
  }

  return null;
};

const axiosLike = async () => {
  const almostFail = getRandom() > 0.3;

  console.log('almostFail', almostFail);

  if (almostFail) {
    throw { status: 401, message: 'unauthorized' };
  }

  return { data: 'success in queryFn' };
};

export default Home;

const getRandom = () => Math.random();
