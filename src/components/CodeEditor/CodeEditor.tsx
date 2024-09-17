import React, { useState } from 'react';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box, IconButton } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { errorNotifyMessage } from 'utils/notifyMessage';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  isGraphQL?: boolean;
  placeholder?: string;
  readOnly?: boolean;
}

const OPENING_BRACE = '{';
const CLOSING_BRACE = '}';
const NEW_LINE = '\n';
const SINGLE_SPACE = ' ';

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  isGraphQL = false,
  placeholder,
  readOnly = false,
}) => {
  const [isFormatted, setIsFormatted] = useState(true);

  const checkBrackets = (query: string) => {
    const stack = [];
    for (let i = 0; i < query.length; i += 1) {
      const currentChar = query[i];
      const topStackItem = stack[stack.length - 1];
      if (currentChar === OPENING_BRACE) {
        stack.push(currentChar);
      }
      if (currentChar === CLOSING_BRACE && topStackItem === OPENING_BRACE) {
        stack.pop();
      }
    }
    return stack.length === 0;
  };

  const clearFormat = (query: string) => {
    return query.replace(/\n/g, SINGLE_SPACE).replace(/\s+/g, SINGLE_SPACE);
  };

  const formatTitle = (queryTitle: string) => {
    return queryTitle
      .replace(/( \( | \(|\( )/gm, '(')
      .replace(/( \))/gm, ')')
      .replace(/( : |(?<=[A-Za-z]):(?=[A-Za-z]))/gm, ': ')
      .replace(/( , |(?<=[A-Za-z]),(?=[A-Za-z]))/gm, ', ')
      .replace(/((?<=.[^ ])= |(?<=.[^ ])=(?=.[^ ])| =(?=.[^ ]))/gm, ' = ');
  };

  const formatQueryInner = (query: string) => {
    return query
      .replace(/( \( | \(|\( )/gm, '(')
      .replace(/( \))/gm, ')')
      .replace(/\)(?=[A-Za-z])/gm, `)${NEW_LINE}`)
      .replace(/( : |(?<=[A-Za-z]):(?=[A-Za-z]))/gm, ': ')
      .replace(/( , |(?<=[A-Za-z]),(?=[A-Za-z]))/gm, ', ')
      .replace(/((?<=.[^ ])= |(?<=.[^ ])=(?=.[^ ])| =(?=.[^ ]))/gm, ' = ')
      .replace(/{/m, `${OPENING_BRACE}${NEW_LINE}`)
      .replace(/(?<![A-Za-z)]) {/gm, `${OPENING_BRACE}${NEW_LINE}`)
      .replace(/(?<=[A-Za-z)] |[A-Za-z)]){/gm, ` ${OPENING_BRACE}${NEW_LINE}`)
      .replace(/{\n (?=[A-Za-z)])/gm, `${OPENING_BRACE}${NEW_LINE}`)
      .replace(/}/gm, `${NEW_LINE}${CLOSING_BRACE}`)
      .replace(/} (?=[A-Za-z)])/gm, `${CLOSING_BRACE}${NEW_LINE}`)
      .replace(/}(?=[A-Za-z)])/gm, `${CLOSING_BRACE}${NEW_LINE}`)
      .replace(/(?<=[A-Za-z)]) (?=[A-Za-z)])/gm, NEW_LINE)
      .replace(/ {2,}/gm, SINGLE_SPACE);
  };

  const formatQuery = (query: string) => {
    const title =
      query.replace(/(?<![A-Za-z)]) {/gm, `{${NEW_LINE}`)[0] !== OPENING_BRACE
        ? query.split(OPENING_BRACE)[0]
        : '';
    if (title) {
      const queryInnerArr = query.split(OPENING_BRACE);
      queryInnerArr.shift();
      const queryInner = `{${queryInnerArr.join(OPENING_BRACE)}`;
      const formatInner = formatQueryInner(queryInner);
      return `${formatTitle(title.trim())} ${formatInner}`;
    }
    return formatQueryInner(query);
  };

  const addIndents = (query: string) => {
    const queryArr = query.split(NEW_LINE);
    const indent = 2;
    let indentCount = 0;
    let result = '';

    for (let i = 0; i < queryArr.length; i += 1) {
      if (queryArr[i].includes(CLOSING_BRACE)) indentCount -= 1;
      result += SINGLE_SPACE.repeat(indentCount * indent) + queryArr[i].trim() + NEW_LINE;
      if (queryArr[i].includes(OPENING_BRACE)) indentCount += 1;
    }

    return result.trim();
  };

  const prettifyQuery = (fullQuery: string) => {
    const queryArr = fullQuery.split('fragment');
    const resultArr = queryArr.map((query) => {
      if (checkBrackets(query)) {
        const clearedQuery = clearFormat(query);
        const formattedQuery = formatQuery(clearedQuery);
        return addIndents(formattedQuery);
      }
      return query;
    });

    return resultArr.join(`${NEW_LINE}${NEW_LINE}fragment `);
  };

  const handleFormat = () => {
    try {
      if (isGraphQL) {
        const formatted = isFormatted ? clearFormat(value) : prettifyQuery(value);
        onChange(formatted);
      } else {
        const parsed = JSON.parse(value);
        const formatted = JSON.stringify(parsed, null, isFormatted ? 0 : 2);
        onChange(formatted);
      }
      setIsFormatted(!isFormatted);
    } catch (error) {
      errorNotifyMessage('Failed to format code');
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        onClick={handleFormat}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1,
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <AutoFixHighIcon />
      </IconButton>
      <CodeMirror
        value={value}
        height='200px'
        theme={EditorView.theme({
          '&': {
            height: '100%',
          },
        })}
        extensions={[isGraphQL ? graphql() : json(), EditorView.lineWrapping]}
        onChange={onChange}
        placeholder={placeholder}
        editable={!readOnly}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: !readOnly,
        }}
      />
    </Box>
  );
};

export default CodeEditor;
