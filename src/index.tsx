import * as React from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { useMergeRefs } from './merge-refs'
import type { Extension } from '@codemirror/state'
import type { ViewUpdate } from '@codemirror/view'

export type CodeMirrorProps = {
  value?: string
  onUpdate?: (update: ViewUpdate) => void
  extensions?: Extension[]
  elementProps?: React.ComponentProps<'div'>
}

const CodeMirror = React.forwardRef<HTMLDivElement, CodeMirrorProps>(
  (
    { value, onUpdate, extensions: passedExtensions = [], elementProps },
    ref
  ) => {
    const innerRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = useMergeRefs(ref, innerRef)

    React.useEffect(() => {
      const currentEditor = innerRef.current
      if (!currentEditor) return

      let view: EditorView
      ;(async () => {
        const extensions: Extension[] = []

        if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate))

        const state = EditorState.create({
          doc: value,
          extensions: [...extensions, ...passedExtensions],
        })

        view = new EditorView({ state, parent: currentEditor })
      })()

      return () => view.destroy()
    }, [innerRef, passedExtensions])

    return <div ref={mergedRef} {...elementProps} />
  }
)

CodeMirror.displayName = 'CodeMirror'

export default CodeMirror
