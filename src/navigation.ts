import {createSharedPathnamesNavigation} from "next-intl/navigation";

export const locales = ["en", "es"] as const;
export type LocaleType = (typeof locales)[number];

export const localePrefix = "always";

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});
