import { EditorState, EditorStateConfig, Extension, StateEffect } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { ComponentProps, forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { useMergeRefs } from './merge-refs'
import { useFirstRender } from './use-first-render'

export type CodeMirrorProps = {
  value?: EditorStateConfig['doc']
  selection?: EditorStateConfig['selection']
  onUpdate?: (update: ViewUpdate) => void
  onEditorViewChange?: (editorView: EditorView) => void
  onEditorStateChange?: (editorState: EditorState) => void
  extensions?: Extension[]
  elementProps?: ComponentProps<'div'>
}

const CodeMirror = forwardRef<HTMLDivElement, CodeMirrorProps>(
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
    ref,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null)
    const mergedRef = useMergeRefs(ref, innerRef)

    const [editorView, setEditorView] = useState<EditorView | null>(null)

    const updateExtension = useMemo<Extension | undefined>(
      () => (onUpdate ? EditorView.updateListener.of(onUpdate) : undefined),
      [],
    )

    const extensions = useMemo<Extension>(
      () =>
        updateExtension
          ? [updateExtension, ...passedExtensions]
          : passedExtensions,
      [updateExtension, passedExtensions],
    )

    const isFirstRender = useFirstRender()

    useEffect(() => {
      const state = EditorState.create({
        doc: value,
        selection: selection,
        extensions,
      })

      if (onEditorStateChange) onEditorStateChange(state)

      const view = new EditorView({
        parent: innerRef.current!,
        state,
      })

      setEditorView(view)
      if (onEditorViewChange) onEditorViewChange(view)

      return () => view.destroy()
    }, [innerRef])

    // extensions
    useEffect(() => {
      // this is already handled on the first render
      if (isFirstRender || !editorView) return

      editorView.dispatch({
        effects: StateEffect.reconfigure.of(extensions),
      })
    }, [passedExtensions])

    // selection
    useEffect(() => {
      if (isFirstRender || !editorView) return

      const transaction = editorView.state.update({
        selection,
      })

      editorView.dispatch(transaction)
    }, [selection, editorView])

    // value
    useEffect(() => {
      if (isFirstRender || !editorView) return

      const transaction = editorView.state.update({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: value,
        },
        selection: editorView.state.selection,
      })

      editorView.dispatch(transaction)
    }, [value, editorView])

    return <div ref={mergedRef} {...elementProps} />
  },
)

CodeMirror.displayName = 'CodeMirror'

export default CodeMirror
