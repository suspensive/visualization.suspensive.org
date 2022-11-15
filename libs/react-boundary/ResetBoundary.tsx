import { ComponentType, createContext, FC, ReactNode, useContext } from 'react';
import { useResetKey } from './hooks';

const initialState = {
  resetKey: 0,
  reset: () => {},
};

const ResetBoundary = createContext(initialState);
if (process.env.NODE_ENV !== 'production') {
  ResetBoundary.displayName = 'ResetBoundary';
}

export const ResetBoundaryProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { resetKey, reset } = useResetKey();

  return <ResetBoundary.Provider value={{ resetKey, reset }}>{children}</ResetBoundary.Provider>;
};

export const ResetBoundaryConsumer = ResetBoundary.Consumer;

export const useResetBoundary = () => useContext(ResetBoundary);

export const withResetBoundary = <P extends Record<string, unknown>>(Component: ComponentType<P>) => {
  const Wrapped = (props: P) => {
    return (
      <ResetBoundaryProvider>
        <Component {...props} />
      </ResetBoundaryProvider>
    );
  };

  return Wrapped;
};
