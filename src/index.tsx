import React from 'react'
import { EditorState, EditorStateConfig } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { useMergeRefs } from './merge-refs'
import type { Extension } from '@codemirror/state'
import type { ViewUpdate } from '@codemirror/view'

export type CodeMirrorProps = {
  value?: string
  selection?: EditorStateConfig['selection']
  onUpdate?: (update: ViewUpdate) => void
  onEditorViewChange?: (editorView: EditorView) => void
  onEditorStateChange?: (editorState: EditorState) => void
  extensions?: Extension[]
  elementProps?: React.ComponentProps<'div'>
}

const CodeMirror = React.forwardRef<HTMLDivElement, CodeMirrorProps>(
  (
    {
      value,
      selection,
      onEditorViewChange,
      onEditorStateChange,
      onUpdate,
      extensions: passedExtensions = [],
      elementProps,
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = useMergeRefs(ref, innerRef)

    const [editorView, setEditorView] = React.useState<EditorView | null>(null)

    React.useEffect(() => {
      const currentEditor = innerRef.current
      if (!currentEditor) return

      const view = new EditorView({ parent: currentEditor })
      setEditorView(view)
      if (onEditorViewChange) onEditorViewChange(view)

      return () => view.destroy()
    }, [innerRef])

    React.useEffect(() => {
      if (!editorView) return

      const extensions: Extension[] = []

      if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate))

      // keep current state, only change extensions
      const editorState = EditorState.create({
        doc: editorView.state.doc.toString(),
        selection: editorView.state.selection,
        extensions: [...extensions, ...passedExtensions],
      })

      editorView.setState(editorState)
      if (onEditorStateChange) onEditorStateChange(editorState)
    }, [passedExtensions, editorView])

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
    }, [value, editorView])

    React.useEffect(() => {
      if (!editorView) return

      const transaction = editorView.state.update({
        selection,
      })

      editorView.dispatch(transaction)
    }, [selection, editorView])

    return <div ref={mergedRef} {...elementProps} />
  }
)

CodeMirror.displayName = 'CodeMirror'

export default CodeMirror
