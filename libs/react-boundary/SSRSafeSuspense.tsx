import type { ComponentProps, FC } from 'react';
import { Suspense as BaseSuspense } from 'react';
import { useIsMounted } from './hooks';

const SSRSafeSuspense: FC<ComponentProps<typeof BaseSuspense>> = props => {
  const isMounted = useIsMounted();

  return isMounted ? <BaseSuspense {...props} /> : <>{props.fallback}</>;
};

export default SSRSafeSuspense