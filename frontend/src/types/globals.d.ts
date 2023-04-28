declare interface IEmptyInterface {}

declare type FCC<P = IEmptyInterface> = import('react').FC<import('react').PropsWithChildren<P>>;
