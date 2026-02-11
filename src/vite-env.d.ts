/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLMarqueeElement> & {
        behavior?: string
        direction?: string
        scrollamount?: number
      },
      HTMLMarqueeElement
    >
  }
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ADMIN_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
