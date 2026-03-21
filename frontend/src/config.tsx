import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getStrings, type Locale, type Strings } from './locale.ts'

interface SiteConfig {
  site_title: string
  locale: Locale
  brand: 'global' | 'ru'
  t: Strings
  loading: boolean
}

const defaults: SiteConfig = {
  site_title: 'Evolve Help Center',
  locale: 'en',
  brand: 'global',
  t: getStrings('en'),
  loading: true,
}

const ConfigContext = createContext<SiteConfig>(defaults)

export function useConfig() {
  return useContext(ConfigContext)
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaults)

  useEffect(() => {
    fetch('/api/v1/helpcenter/config/')
      .then((r) => r.json())
      .then((data) => {
        const locale = (data.locale === 'ru' ? 'ru' : 'en') as Locale
        setConfig({
          site_title: data.site_title ?? defaults.site_title,
          locale,
          brand: data.brand === 'ru' ? 'ru' : 'global',
          t: getStrings(locale),
          loading: false,
        })
      })
      .catch(() => setConfig({ ...defaults, loading: false }))
  }, [])

  useEffect(() => {
    if (!config.loading) {
      document.title = config.site_title
      document.documentElement.lang = config.locale
      if (config.brand === 'ru') {
        document.documentElement.setAttribute('data-brand', 'ru')
      }
    }
  }, [config])

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
