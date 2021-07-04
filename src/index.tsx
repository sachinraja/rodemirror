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
    const [editorState, setEditorState] = React.useState<EditorState | null>(
      null
    )
    const [editorView, setEditorView] = React.useState<EditorView | null>(null)

    React.useEffect(() => {
      const currentEditor = innerRef.current
      if (!currentEditor) return

      let view: EditorView | undefined
      ;(async () => {
        const extensions: Extension[] = []

        if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate))

        const state = EditorState.create({
          doc: value,
          extensions: [...extensions, ...passedExtensions],
        })

        setEditorState(state)

        view = new EditorView({ state, parent: currentEditor })
        setEditorView(view)
      })()

      return () => view?.destroy()
    }, [innerRef, passedExtensions, onUpdate])

    React.useEffect(() => {
      if (!editorView) return

      const transaction = editorView.state.update({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: value,
        },
      })

      editorView.dispatch(transaction)
    }, [value])

    return <div ref={mergedRef} {...elementProps} />
  }
)

CodeMirror.displayName = 'CodeMirror'

export default CodeMirror
