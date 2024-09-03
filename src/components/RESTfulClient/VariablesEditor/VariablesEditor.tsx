import React from 'react';
import CollapsibleCodeEditor from '../../CollapsibleCodeEditor/CollapsibleCodeEditor';

interface VariablesEditorProps {
  variables: string;
  onVariablesChange: (value: string) => void;
  t: (key: string) => string;
}

const VariablesEditor: React.FC<VariablesEditorProps> = ({ variables, onVariablesChange, t }) => (
  <CollapsibleCodeEditor
    title={t('restful.variables')}
    value={variables}
    onChange={onVariablesChange}
    language="json"
  />
);

export default VariablesEditor;
