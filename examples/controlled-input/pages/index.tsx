import { useMemo, useState } from 'react'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror from 'rodemirror'

export default function Home() {
  const defaultValue = `const a = 5
a = 10
console.log(a)`

  const [value, setValue] = useState(defaultValue)

  const extensions = useMemo(() => [basicSetup, oneDark, javascript()], [])

  console.log(value)
  return (
    <>
      <CodeMirror
        value={value}
        extensions={extensions}
        onUpdate={(v) => {
          if (v.docChanged) {
            setValue(v.state.doc.toString())
          }
        }}
      />
      <p>Current value:</p>
      <pre>{value.toString()}</pre>
    </>
  )
}
