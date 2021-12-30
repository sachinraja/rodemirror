import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import CodeMirror from '../src'

const defaultValue = 'hello'

describe('component', () => {
  it('renders', () => {
    const { baseElement } = render(<CodeMirror />)
    const editorElement = baseElement.querySelector('.cm-editor')

    expect(editorElement).toBeInTheDocument()
  })

  it('renders with value prop text', () => {
    render(<CodeMirror value={defaultValue} />)

    expect(screen.getByText(defaultValue)).toBeInTheDocument()
  })

  it('can change value', () => {
    const { baseElement } = render(<CodeMirror value={defaultValue} />)

    const editorElement = baseElement.querySelector('.cm-editor')

    if (!editorElement) return

    const secondValue = 'world'

    // must use blur here because editor is contenteditable
    fireEvent.blur(editorElement, {
      target: { textContent: secondValue },
    })

    expect(screen.queryByText(defaultValue)).not.toBeInTheDocument()
    expect(screen.queryByText(secondValue)).toBeInTheDocument()
  })
})
