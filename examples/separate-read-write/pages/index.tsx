import { useEffect, useMemo, useState } from 'react'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror from 'rodemirror'
import type { Extension } from '@codemirror/state'

const Editor = ({
  shouldAddLogOnChange,
}: {
  shouldAddLogOnChange: boolean
}) => {
  const extensions = useMemo<Extension[]>(
    () => [basicSetup, oneDark, javascript()],
    []
  )

  const defaultValue = "console.log('Hello world!')"
  const [readValue, setReadValue] = useState(defaultValue)
  const [writeValue, setWriteValue] = useState(defaultValue)

  // example
  useEffect(() => {
    setWriteValue(`${readValue}\nconsole.log('hello world')`)
  }, [shouldAddLogOnChange])

  return (
    <CodeMirror
      value={writeValue}
      onUpdate={(v) => {
        if (v.docChanged) {
          setReadValue(v.state.doc.toString())
        }
      }}
      extensions={extensions}
    />
  )
}

export default function Home() {
  const [shouldAddLogOnChange, setShouldAddLogOnChange] = useState(false)

  useEffect(() => {
    // change every 2 seconds
    const interval = setInterval(
      () => setShouldAddLogOnChange(!shouldAddLogOnChange),
      2000
    )

    return () => clearInterval(interval)
  })

  return <Editor shouldAddLogOnChange={shouldAddLogOnChange} />
}
