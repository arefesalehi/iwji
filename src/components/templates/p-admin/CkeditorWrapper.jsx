'use client'

import { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function CkeditorWrapper({ value, onChange }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="bg-gray-100 border rounded h-40 animate-pulse"></div>
  }

  return (
    <div  className="ckeditor-container">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {
          editor.editing.view.change((writer) => {
            writer.setStyle(
              'direction',
              'rtl',
              editor.editing.view.document.getRoot(),
            )
            writer.setStyle(
              'text-align',
              'right',
              editor.editing.view.document.getRoot(),
            )
          })
        }}
        onChange={(event, editor) => {
          onChange(editor.getData())
        }}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            '|',
            'undo',
            'redo',
          ],
          language: 'fa',
          placeholder: 'محتوای مقاله را اینجا بنویسید...',
        }}
      />
      <style jsx global>{`
        .ck.ck-editor__editable_inline {
          direction: rtl;
          text-align: right;
          min-height: 300px;
        }
        .ck.ck-toolbar {
          direction: ltr;
        }
      `}</style>
    </div>
  )
}
