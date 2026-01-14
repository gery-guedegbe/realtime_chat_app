"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // usePathname() from next-intl returns pathname WITHOUT locale prefix
    // router.replace will automatically add the locale prefix
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900/50 p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLanguage(loc)}
          className={`cursor-pointer rounded px-3 py-1.5 text-xs font-bold uppercase transition-all ${
            locale === loc
              ? "bg-green-500 text-black"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
