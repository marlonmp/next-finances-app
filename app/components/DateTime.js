'use client';

import { useEffect, useState } from 'react';

export default function DateTime({ dateTime, fallback, children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const time = <time dateTime={dateTime}>{children}</time>;

  return mounted ? time : (fallback ?? <>...</>);
}
