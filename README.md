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

The `useMemo` is so that the extensions are not recreated each time, which would cause a recreation of the state and view.

### Controlled

Create a controlled component for reading values.

```tsx
import { useMemo, useState } from 'react'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror, { CodeMirrorProps } from 'rodemirror'
import type { Extension } from '@codemirror/state'

const Editor = () => {
  const extensions = useMemo<Extension[]>(
    () => [basicSetup, oneDark, javascript()],
    []
  )

  const defaultValue = "console.log('Hello world!')"
  const [, setValue] = useState(defaultValue)

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
