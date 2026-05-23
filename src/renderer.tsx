import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PaceLokal — Hyperlocal Running</title>
        <meta name="description" content="PaceLokal — komunitas pelari hyperlocal Indonesia. Dari Banyumas Raya ke Jawa Tengah ke Indonesia. Sub-brand SparkMind Sovereign." />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/styles.css" rel="stylesheet" />
      </head>
      <body class="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  )
})
