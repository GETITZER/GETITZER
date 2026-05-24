import { useEffect, useId } from 'react'

interface Props {
  schema: object
}

export default function SchemaMarkup({ schema }: Props) {
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const scriptId = `schema-${id}`
    const existing = document.getElementById(scriptId)
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = scriptId
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [schema, id])

  return null
}
