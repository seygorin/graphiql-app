import React, { useMemo, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

interface SchemaType {
  name: string;
  description?: string;
  fields?: SchemaField[];
  interfaces?: SchemaType[];
  possibleTypes?: SchemaType[];
  enumValues?: SchemaEnumValue[];
}

interface SchemaField {
  name: string;
  description?: string;
  args?: SchemaInputValue[];
  type: {
    name?: string;
    kind: string;
    ofType?: {
      name?: string;
      kind: string;
    };
  };
}

interface SchemaEnumValue {
  name: string;
  description?: string;
}

interface SchemaInputValue {
  name: string;
  description?: string;
  type: {
    name?: string;
    kind: string;
    ofType?: {
      name?: string;
      kind: string;
    };
  };
}

interface DocumentationViewerProps {
  schema: {
    types: SchemaType[];
  };
}

const DocumentationViewer: React.FC<DocumentationViewerProps> = ({ schema }) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const currentType = useMemo(() => {
    return currentPath.reduce(
      (acc: SchemaType | { types: SchemaType[] }, curr) => {
        if ('fields' in acc && acc.fields) {
          return acc.fields.find((field: SchemaField) => field.name === curr) || acc;
        }
        return acc;
      },
      schema.types.find((type) => type.name === currentPath[0]) || schema,
    );
  }, [schema, currentPath]);

  const handleClick = (index: number) => {
    setCurrentPath((prev) => prev.slice(0, index + 1));
  };

  const renderBreadcrumbs = () => (
    <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
      <Button color='inherit' onClick={() => setCurrentPath([])}>
        Schema
      </Button>
      {currentPath.map((path, index) => (
        <Button key={path} color='inherit' onClick={() => handleClick(index)}>
          {path}
        </Button>
      ))}
    </Breadcrumbs>
  );

  const renderTypeDetails = (type: SchemaType) => (
    <Box>
      <Typography variant='h6'>{type.name}</Typography>
      {type.description && <Typography variant='body2'>{type.description}</Typography>}
      {type.fields && (
        <>
          <Typography variant='subtitle1'>Fields</Typography>
          <List>
            {type.fields.map((field) => (
              <ListItem
                key={field.name}
                button
                onClick={() => setCurrentPath((prev) => [...prev, field.name])}
              >
                <ListItemText
                  primary={`${field.name}: ${field.type.name || field.type.kind}`}
                  secondary={field.description}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {type.enumValues && (
        <>
          <Typography variant='subtitle1'>Enum Values</Typography>
          <List>
            {type.enumValues.map((enumValue) => (
              <ListItem key={enumValue.name}>
                <ListItemText primary={enumValue.name} secondary={enumValue.description} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  const renderFieldDetails = (field: SchemaField) => (
    <Box>
      <Typography variant='h6'>{field.name}</Typography>
      <Typography variant='subtitle1'>
        Type:{' '}
        {field.type.name ||
          `${field.type.kind}${field.type.ofType ? ` of ${field.type.ofType.name || field.type.ofType.kind}` : ''}`}
      </Typography>
      {field.description && <Typography variant='body2'>{field.description}</Typography>}
      {field.args && field.args.length > 0 && (
        <>
          <Typography variant='subtitle1'>Arguments</Typography>
          <List>
            {field.args.map((arg) => (
              <ListItem key={arg.name}>
                <ListItemText
                  primary={`${arg.name}: ${arg.type.name || arg.type.kind}`}
                  secondary={arg.description}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <Box>
      {renderBreadcrumbs()}
      <Divider sx={{ my: 2 }} />
      {(() => {
        if (currentPath.length === 0) {
          return (
            <List>
              {schema.types.map((type) => (
                <ListItem key={type.name} button onClick={() => setCurrentPath([type.name])}>
                  <ListItemText primary={type.name} secondary={type.description} />
                </ListItem>
              ))}
            </List>
          );
        }

        if ('fields' in currentType) {
          return renderTypeDetails(currentType as SchemaType);
        }

        return renderFieldDetails(currentType as SchemaField);
      })()}
    </Box>
  );
};

export default DocumentationViewer;
