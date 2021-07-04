# rodemirror

React component for codemirror.next

## Installation

`npm i rodemirror`

## Usage

Use the `CodeMirror` component:

```tsx
import CodeMirror from 'rodemirror'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/javascript'

const Editor = () => {
  const extensions = useMemo(() => [basicSetup, oneDark, javascript()], [])

  return <CodeMirror extensions={extensions} />
}
```

The `useMemo` is so that the extensions are not recreated each time, which would cause a recreation of the state. You'll want to do the same with the `selection` prop.

### Controlled

Create a controlled component for reading values.

```tsx
import { useMemo, useState } from 'react'
import type { Extension } from '@codemirror/state'

const Editor = () => {
  const extensions = useMemo<Extension[]>(
    () => [basicSetup, oneDark, javascript()],
    []
  )

  const defaultValue = "console.log('Hello world!')"
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

WARNING: Do **not** pass in a controlled value to the `CodeMirror` value prop. This **will** update the entire document on each update and **will** break the editor. If you want to update the value from a state, you can separate the reading and writing values.

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

The same applies to `EditorState`, though it can be accessed from `EditorView.state` anyway.

## Examples

See the [examples](https://github.com/sachinraja/rodemirror/tree/main/examples) for how the editor can be used.
