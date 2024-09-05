import React from 'react';
import { EditorView } from '@codemirror/view';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, placeholder }) => {
  return (
    <CodeMirror
      value={value}
      height='150px'
      theme={EditorView.theme({
        '&': {
          height: '100%',
        },
      })}
      extensions={[langs.json()]}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CodeEditor;
