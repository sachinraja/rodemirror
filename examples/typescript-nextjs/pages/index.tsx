import { basicSetup } from '@codemirror/basic-setup'
import { javascript } from '@codemirror/lang-javascript'
import type { Extension } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import type { EditorView } from '@codemirror/view'
import { useMemo, useState } from 'react'
import CodeMirror from 'rodemirror'

export default function Home() {
  const baseExtensions: Extension[] = [basicSetup, oneDark]

  const [extensions, setExtensions] = useState(baseExtensions)

  const selection = useMemo(
    () => ({
      anchor: 7,
    }),
    [],
  )

  const defaultValue = "console.log('Hello world!')"
  const [value, setValue] = useState(defaultValue)

  const [editorView, setEditorView] = useState<EditorView | null>(null)

  return (
    <>
      <CodeMirror
        value={defaultValue}
        onUpdate={(v) => {
          if (v.docChanged) {
            setValue(v.state.doc.toString())
          }
        }}
        onEditorViewChange={(editorView) => setEditorView(editorView)}
        selection={selection}
        extensions={extensions}
      />

      <div style={{ marginTop: 5 }}>
        <button
          type='button'
          onClick={() => {
            if (!editorView) return

            const { doc } = editorView.state

            if (doc.length === 0) return

            // remove last character
            editorView.dispatch({
              changes: {
                from: doc.length - 1,
                to: doc.length,
                insert: '',
              },
            })
          }}
        >
          Click me to remove a character
        </button>

        <button
          type='button'
          onClick={() => setExtensions([...baseExtensions, javascript()])}
        >
          Click me to add the JavaScript extension
        </button>

        <button type='button' onClick={() => setExtensions(baseExtensions)}>
          Click me to remove the JavaScript extension
        </button>
      </div>
    </>
  )
}
