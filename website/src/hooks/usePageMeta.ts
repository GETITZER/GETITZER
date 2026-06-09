import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
  canonical?: string
}

// Accepts either usePageMeta({ title, description, canonical? }) or usePageMeta(title, description, canonical?)
export function usePageMeta(
  titleOrMeta: string | PageMeta,
  descriptionArg?: string,
  canonicalArg?: string,
) {
  const title = typeof titleOrMeta === 'string' ? titleOrMeta : titleOrMeta.title
  const description = typeof titleOrMeta === 'string' ? (descriptionArg ?? '') : titleOrMeta.description
  const canonical = typeof titleOrMeta === 'string' ? canonicalArg : titleOrMeta.canonical

  const fullTitle = title.includes('ISA Valve') ? title : `${title} | ISA Valve Solutions`

  useEffect(() => {
    document.title = fullTitle

    const descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (descTag) descTag.content = description

    const canonTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical && canonTag) canonTag.href = canonical

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = fullTitle

    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (ogDesc) ogDesc.content = description

    if (canonical) {
      const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
      if (ogUrl) ogUrl.content = canonical
    }

    return () => {
      document.title = 'ISA Valve Solutions — Industrial Valves South Africa'
    }
  }, [fullTitle, description, canonical])
}
