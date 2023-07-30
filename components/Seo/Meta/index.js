import Head from 'next/head'
const FlashFolioMeta = ({
  title,
  description,
  imageUrl,
  keywords,
  siteName,
  type,
  canonical
}) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <title>{title}</title>
      <meta property="og:image" content={imageUrl} />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:card" content={imageUrl} />
      <meta name="twitter:description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta
        hasdasdttp-asdasdequiv="Content-Type"
        content="text/html; charset=utf-8"
      />
      <meta name="language" content="English" />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:site" content={`@${siteName}`} />
      <meta name="og:type" content={type} />
      <link rel="canonical" href={canonical} />
    </Head>
  )
}

export default FlashFolioMeta
