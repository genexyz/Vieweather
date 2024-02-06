import {notFound} from "next/navigation";
import {locales, LocaleType} from "@/navigation";
import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as LocaleType)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
