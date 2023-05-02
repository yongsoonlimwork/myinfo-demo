import BigNumber from 'bignumber.js';
import dayjs from "dayjs";

export const formatPrice = (value: string | number) => new BigNumber(value).toFormat(2);

export const formatMonthYear = (value: string) => dayjs(value).format('MMM YYYY');
export const formatDayMonthYear = (value: string) => dayjs(value).format('DD MMM YYYY');
