import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import Snackbar from '/components/common/Snackbar';

const FeedBackAlertContext = createContext<ValueType | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

type FeedBackType = 'snackbar' | 'backdrop';
export interface AlertProps {
  message: string;
  duration?: number;
  onPress?: () => void;
  id: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}
type FeedbackTypes = Record<FeedBackType, AlertProps | null>;
type OpenAlertParams = Omit<AlertProps, 'id'> & { type: FeedBackType };

type ValueType = {
  openAlert: ({
    message,
    type,
    duration,
    onPress,
    severity,
  }: OpenAlertParams) => void;
};

export function FeedBackAlertProvider({ children }: ProviderProps) {
  const [feedbackTypes, setFeedbackTypes] = useState<FeedbackTypes>({
    snackbar: null,
    backdrop: null,
  });

  const clearAlert = useCallback((feedbackType: FeedBackType) => {
    setFeedbackTypes(prev => ({ ...prev, [feedbackType]: null }));
  }, []);

  const openAlert = useCallback(
    ({
      message,
      type,
      duration = 3000,
      onPress = noop,
      severity,
    }: OpenAlertParams) => {
      const props = { message, duration, onPress, id: uuidv4(), severity };
      setFeedbackTypes(prev => ({ ...prev, [type]: props }));
    },
    []
  );

  const value = useMemo(
    () => ({
      openAlert,
    }),
    [openAlert]
  );

  return (
    <FeedBackAlertContext.Provider value={value}>
      {feedbackTypes.snackbar && (
        <Snackbar
          materials={feedbackTypes.snackbar}
          clearAlert={() => clearAlert('snackbar')}
        />
      )}
      {children}
    </FeedBackAlertContext.Provider>
  );
}

export function useFeedBackAlertContext() {
  const context = useContext(FeedBackAlertContext);
  if (!context) {
    throw new Error(`FeedBackAlertContext is undefined`);
  }
  return context;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
