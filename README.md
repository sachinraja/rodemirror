# rodemirror

React component for [CodeMirror 6](https://codemirror.net/6/)

## Features

- Lightweight, 829B minified + gzipped
- Simple, wraps CodeMirror's view and state and gets out of your way
- Efficient, only renders when necessary and uses [`StateEffect`](https://codemirror.net/6/docs/ref/#state.StateEffect) to update the editor state on prop changes. The view and state are **never** recreated.

## Installation

```shell
npm install rodemirror @codemirror/state @codemirror/view
```

## Usage

Use the `CodeMirror` component:

```tsx
import { basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { useMemo } from 'react'
import CodeMirror from 'rodemirror'

const Editor = () => {
  const extensions = useMemo(() => [basicSetup, oneDark, javascript()], [])

  return <CodeMirror extensions={extensions} />
}
```

The `useMemo` is so that the extensions are not recreated each time, which would cause unnecessary editor transactions. You'll want to do the same with the `selection` prop.

### Uncontrolled

Create an uncontrolled component for reading values.

```tsx
import { basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { Extension } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { useMemo, useState } from 'react'
import CodeMirror from 'rodemirror'

const Editor = () => {
  const extensions = useMemo<Extension[]>(
    () => [basicSetup, oneDark, javascript()],
    [],
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
import { useMemo, useState, useEffect } from 'react'
import CodeMirror from 'rodemirror'
import type { Extension } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'

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
import { EditorView } from '@codemirror/view'

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
