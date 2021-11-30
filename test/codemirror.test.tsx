import { render, fireEvent } from '@testing-library/react'
import CodeMirror from '../src'

describe('component', () => {
  it('renders', async () => {
    const { baseElement } = render(<CodeMirror />)
    const editorElement = baseElement.querySelector('.cm-editor')

    expect(editorElement).toBeInTheDocument()
  })

  it('renders with value prop text', async () => {
    const defaultValue = 'hello'
    const { getByText } = render(<CodeMirror value={defaultValue} />)

    expect(getByText(defaultValue)).toBeInTheDocument()
  })

  it('can change value', async () => {
    const defaultValue = 'hello'

    const { baseElement, queryByText } = render(
      <CodeMirror value={defaultValue} />
    )

    const editorElement = baseElement.querySelector('.cm-editor')

    if (!editorElement) return

    const secondValue = 'world'

    // must use blur here because editor is contenteditable
    fireEvent.blur(editorElement, {
      target: { textContent: secondValue },
    })

    expect(queryByText(defaultValue)).not.toBeInTheDocument()
    expect(queryByText(secondValue)).toBeInTheDocument()
  })
})
