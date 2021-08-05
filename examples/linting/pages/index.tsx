import { useMemo } from 'react'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { esLint, javascript } from '@codemirror/lang-javascript'
import CodeMirror from 'rodemirror'
import { linter } from '@codemirror/lint'
// eslint4b may not work if you are not using a bundler like webpack
// if you get an error, try using eslint4b-prebuilt:
// https://www.npmjs.com/package/eslint4b-prebuilt
import Linter from 'eslint4b'

export default function Home() {
  const esLintLinter = useMemo(() => esLint(new Linter()), [])

  const extensions = useMemo(
    () => [basicSetup, oneDark, javascript(), linter(esLintLinter)],
    [esLintLinter]
  )

  const value = `const a = 5
a = 10
console.log(a)`

  return <CodeMirror value={value} extensions={extensions} />
}
