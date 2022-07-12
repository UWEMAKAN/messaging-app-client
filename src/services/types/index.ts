import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

export interface Action {
  type: string;
  payload: any;
}
