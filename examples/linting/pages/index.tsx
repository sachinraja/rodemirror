import { useMemo, useState } from 'react'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { esLint, javascript } from '@codemirror/lang-javascript'
import CodeMirror from 'rodemirror'
import { linter, openLintPanel } from '@codemirror/lint'
// eslint4b may not work if you are not using a bundler like webpack
// if you get an error, try using eslint4b-prebuilt:
// https://www.npmjs.com/package/eslint4b-prebuilt
import Linter from 'eslint4b'

import type { EditorView } from '@codemirror/view'

export default function Home() {
  const esLintLinter = useMemo(() => esLint(new Linter()), [])

  const [editorView, setEditorView] = useState<EditorView | null>(null)

  const extensions = useMemo(
    () => [basicSetup, oneDark, javascript(), linter(esLintLinter)],
    [esLintLinter]
  )

  const value = `const a = 5
a = 10
console.log(a)`

  return (
    <CodeMirror
      value={value}
      extensions={extensions}
      onEditorViewChange={(changedEditorView) =>
        setEditorView(changedEditorView)
      }
      onEditorStateChange={(editorState) => {
        // to open the lint panel by default we must
        // grab a reference to the editorView and then
        // in onEditorStateChange, openLintPanel
        // we cannot call openLintPanel in onEditorViewChange
        // because the lintState has not been created at that time
        if (!editorView) return

        openLintPanel(editorView)
      }}
    />
  )
}
