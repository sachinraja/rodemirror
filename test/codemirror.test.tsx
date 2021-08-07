import { render } from '@testing-library/react'
import CodeMirror from 'rodemirror'

describe('component', () => {
  it('renders', async () => {
    const { baseElement } = render(<CodeMirror />)
    const editorComponent = baseElement.querySelector('.cm-editor')

    expect(editorComponent).toBeInTheDocument()
  })

  it('renders with value prop text', async () => {
    const defaultValue = 'hello'
    const { getByText } = render(<CodeMirror value={defaultValue} />)

    expect(getByText(defaultValue)).toBeInTheDocument()
  })
})
