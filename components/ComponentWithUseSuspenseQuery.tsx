import { useSuspenseQuery } from '@suspensive/react-query';
import { Box } from './uis';

type Props = {
  queryKey: unknown[];
  queryFn: () => Promise<{ data: string }>;
};

export const ComponentWithUseSuspenseQuery = ({ queryKey, queryFn }: Props) => {
  const { data } = useSuspenseQuery(queryKey, queryFn);

  return <Box.Success>{data.data}</Box.Success>;
};
