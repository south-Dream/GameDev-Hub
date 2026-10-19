import { useState } from 'react';
export function ConfigIcon({ icon, fallback }: { icon: string; fallback: string }) {
  const [failed, setFailed] = useState(false);
  const image = /^https?:\/\//i.test(icon) || icon.startsWith('icons/');
  if (!image || failed) return <>{failed ? fallback.slice(0, 1) : icon}</>;
  return <img src={icon} alt="" loading="lazy" onError={() => setFailed(true)} />;
}
