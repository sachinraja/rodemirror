# rodemirror

React component for [CodeMirror 6](https://codemirror.net/6/)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Features

- Lightweight, 829B minified + gzipped
- Simple, wraps CodeMirror's view and state and gets out of your way
- Efficient, only renders when necessary and uses [`StateEffect`](https://codemirror.net/6/docs/ref/#state.StateEffect) to update the editor state on prop changes. The view and state are **never** recreated.

## Installation

```bash
npm install rodemirror @codemirror/state @codemirror/view
```

## Usage

Use the `CodeMirror` component:

```tsx
import CodeMirror from 'rodemirror'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import { useMemo } from 'react'

const Editor = () => {
  const extensions = useMemo(() => [basicSetup, oneDark, javascript()], [])

  return <CodeMirror extensions={extensions} />
}
```

The `useMemo` is so that the extensions are not recreated each time, which would cause unnecessary editor transactions. You'll want to do the same with the `selection` prop.

### Uncontrolled

Create an uncontrolled component for reading values.

```tsx
import CodeMirror from 'rodemirror'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import { useMemo, useState } from 'react'
import type { Extension } from '@codemirror/state'

const Editor = () => {
  const extensions = useMemo<Extension[]>(
    () => [basicSetup, oneDark, javascript()],
    []
  )

  const defaultValue = "console.log('Hello world!')"
  // remove if you do not need the value
  const [value, setValue] = useState(defaultValue)

  return (
    <CodeMirror
      value={defaultValue}
      onUpdate={(v) => {
        if (v.docChanged) {
          setValue(v.state.doc.toString())
        }
      }}
      extensions={extensions}
    />
  )
}
```

### Controlled/Separate Reading and Writing

A truly controlled value is not recommended as you will be overwriting the entire document on each input and the editor will become very slow. This also does not work with features such as autocomplete. If you must pass in a controlled value, you can separate the reading and writing values and only update when necessary:

```tsx
import CodeMirror from 'rodemirror'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import { useMemo, useState, useEffect } from 'react'
import type { Extension } from '@codemirror/state'

const Editor = ({ shouldAddLogOnChange }) => {
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
```

### [EditorView](https://codemirror.net/6/docs/ref/#view.EditorView) and [EditorState](https://codemirror.net/6/docs/ref/#state.EditorState) (Complex Use Cases)

Unless you are performing complex actions, you likely do not need this. You can use callbacks to keep `EditorView` and `EditorState`. You can keep the `EditorView` in a `useState` like so:

```tsx
import type { EditorView } from '@codemirror/view'

const Editor = () => {
  const extensions = useMemo(() => [basicSetup, oneDark, javascript()], [])

  const [editorView, setEditorView] = useState<EditorView | null>(null)

  return (
    <CodeMirror
      extensions={extensions}
      onEditorViewChange={(editorView) => setEditorView(editorView)}
    />
  )
}
```

The same applies to `EditorState`, though it can also be accessed from `EditorView.state`.

## Examples

See the [examples](https://github.com/sachinraja/rodemirror/tree/main/examples) for how the editor can be used.
