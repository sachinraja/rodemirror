import { render } from '@testing-library/react'
import CodeMirror from 'rodemirror'

describe('component', () => {
  it('renders', async () => {
    const component = render(<CodeMirror value="hi" />)
    expect(component.baseElement).toBeInTheDocument()
  })
})
