import { basicSetup } from '@codemirror/basic-setup'
import { esLint, javascript } from '@codemirror/lang-javascript'
import { linter, openLintPanel } from '@codemirror/lint'
import { oneDark } from '@codemirror/theme-one-dark'
import { useMemo } from 'react'
import CodeMirror from 'rodemirror'
// eslint4b may not work if you are not using a bundler like webpack
// if you get an error, try using eslint4b-prebuilt:
// https://www.npmjs.com/package/eslint4b-prebuilt
import Linter from 'eslint4b'

import type { EditorView } from '@codemirror/view'

export default function Home() {
  const esLintLinter = useMemo(() => esLint(new Linter()), [])

  const extensions = useMemo(
    () => [basicSetup, oneDark, javascript(), linter(esLintLinter)],
    [esLintLinter],
  )

  const value = `const a = 5
a = 10
console.log(a)`

  return (
    <CodeMirror
      value={value}
      extensions={extensions}
      // open lint panel at start
      onEditorViewChange={(editorView) => openLintPanel(editorView)}
    />
  )
}
