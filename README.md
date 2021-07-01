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

Create a controlled component.

```tsx
const Editor = () => {
  const extensions = useMemo(() => [basicSetup, oneDark, javascript()], [])

  const [value, setValue] = useState("console.log('Hello world!')")

  return <CodeMirror value={value} onUpdate={(v) => setValue(v.state.doc.toString())} extensions={[basicSetup, oneDark, javascript()]} />
}
```
