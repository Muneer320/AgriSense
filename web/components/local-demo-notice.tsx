"use client";
import { useLanguage } from './language-provider';

export function LocalDemoNotice() {
  const { t }=useLanguage();
  if(process.env.NEXT_PUBLIC_LOCAL_DEMO!=="true") return null;
  return <div role="status" className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-xs text-amber-950"><strong>{t('localDemoTitle')}.</strong> {t('localDemoBody')}</div>;
}
