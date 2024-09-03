import React from 'react';
import CollapsibleCodeEditor from 'components/CollapsibleCodeEditor';

interface RequestBodyEditorProps {
  requestBody: string;
  onRequestBodyChange: (value: string) => void;
  t: (key: string) => string;
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  requestBody,
  onRequestBodyChange,
  t,
}) => (
  <CollapsibleCodeEditor
    title={t('restful.requestBody')}
    value={requestBody}
    onChange={onRequestBodyChange}
    language="json"
  />
);

export default RequestBodyEditor;
