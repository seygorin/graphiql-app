import React from 'react';
import CollapsibleCodeEditor from 'components/CollapsibleCodeEditor';

interface VariablesEditorProps {
  variables: string;
  onVariablesChange: (value: string) => void;
  t: (key: string) => string;
}

const VariablesEditor: React.FC<VariablesEditorProps> = ({ variables, onVariablesChange, t }) => {
  return (
    <CollapsibleCodeEditor
      title={t('restful.variables')}
      value={variables}
      onChange={onVariablesChange}
    />
  );
};

export default VariablesEditor;
