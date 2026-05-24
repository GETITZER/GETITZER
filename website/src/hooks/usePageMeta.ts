import { useEffect } from 'react'

const DEFAULT_TITLE = 'ISA Valve Solutions — Precision-Engineered Valves & Industrial Supplies'
const DEFAULT_DESC = 'ISO 9001:2015 certified ball, butterfly, gate and knife gate valves for mining, water treatment, oil & gas and industrial applications. South Africa.'

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setOg(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = `${title} | ISA Valve Solutions`
    document.title = fullTitle
    const desc = description ?? DEFAULT_DESC
    setMeta('description', desc)
    setOg('og:title', fullTitle)
    setOg('og:description', desc)
    return () => {
      document.title = DEFAULT_TITLE
      setMeta('description', DEFAULT_DESC)
    }
  }, [title, description])
}
