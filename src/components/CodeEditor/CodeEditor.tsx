import React from 'react';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      height='150px'
      theme={EditorView.theme({
        '&': {
          height: '100%',
        },
      })}
      extensions={[json()]}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
