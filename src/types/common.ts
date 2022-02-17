import { STREAM_TYPE, CHANGE_STATE } from '/lib/constant';

export type TStreamType = typeof STREAM_TYPE[keyof typeof STREAM_TYPE];

export type ChangeStatusType = typeof CHANGE_STATE[keyof typeof CHANGE_STATE];
