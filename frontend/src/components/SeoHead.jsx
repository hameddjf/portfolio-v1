import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SeoHead = () => {
  const { t, i18n } = useTranslation();

  // توضیحات بر اساس زبان تغییر می‌کنه
  const description = i18n.language === 'fa'
    ? 'پورتفولیوی شخصی حامد مرادی، توسعه‌دهنده فول‌استک و متخصص جنگو.'
    : 'Personal portfolio of Hamed Moradi, Full Stack Django Developer.';

  return (
    <Helmet>
      <title>{t('header.title')} | Portfolio</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta charSet="utf-8" />
      <html lang={i18n.language} dir={i18n.language === 'fa' ? 'rtl' : 'ltr'} />
    </Helmet>
  );
};

export default SeoHead;