import React from 'react';
import CollapsibleCodeEditor from 'components/CollapsibleCodeEditor';

interface HeadersEditorProps {
  headers: string;
  onHeadersChange: (value: string) => void;
  t: (key: string) => string;
}

const HeadersEditor: React.FC<HeadersEditorProps> = ({ headers, onHeadersChange, t }) => (
  <CollapsibleCodeEditor
    title={t('restful.headers')}
    value={headers}
    onChange={onHeadersChange}
    language="plaintext"
  />
);

export default HeadersEditor;
