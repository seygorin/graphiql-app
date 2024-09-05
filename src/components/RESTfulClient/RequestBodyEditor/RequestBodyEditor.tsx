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
}) => {
  return (
    <CollapsibleCodeEditor
      title={t('restful.requestBody')}
      value={requestBody}
      onChange={onRequestBodyChange}
    />
  );
};

export default RequestBodyEditor;
