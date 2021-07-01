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
    return (
        <CodeMirror extensions={[basicSetup, oneDark, javascript()]} />
    )
}
```
