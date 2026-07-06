interface IconProps {
  size?: number;
}

const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
});

export const IconSpeaker = ({ size }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4z" fill="currentColor" stroke="none" />
    <path d="M16 9c1.2 1.6 1.2 4.4 0 6M18.5 6.5c2.4 3 2.4 8 0 11" />
  </svg>
);

export const IconStar = ({ size, filled = true }: IconProps & { filled?: boolean }) => (
  <svg {...base(size)}>
    <path
      d="M12 3l2.7 5.6 6 .8-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.3 9.4l6-.8L12 3z"
      fill={filled ? 'currentColor' : 'none'}
    />
  </svg>
);

export const IconLock = ({ size }: IconProps) => (
  <svg {...base(size)}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" fill="currentColor" stroke="none" />
    <path d="M8 10V7.5a4 4 0 018 0V10" />
  </svg>
);

export const IconHome = ({ size }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 11l8-7 8 7v8.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19.5V11z" />
    <path d="M10 21v-6h4v6" />
  </svg>
);

export const IconArrowLeft = ({ size }: IconProps) => (
  <svg {...base(size)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconArrowRight = ({ size }: IconProps) => (
  <svg {...base(size)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconPrint = ({ size }: IconProps) => (
  <svg {...base(size)}>
    <path d="M7 8V4h10v4M7 17H5a2 2 0 01-2-2v-5a2 2 0 012-2h14a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
    <rect x="7" y="14" width="10" height="6" rx="1" />
  </svg>
);

export const IconReplay = ({ size }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 5v6h6" />
    <path d="M4.5 11a8 8 0 102-5.3" />
  </svg>
);
