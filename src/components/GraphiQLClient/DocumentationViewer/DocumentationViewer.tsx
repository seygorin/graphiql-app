import React, { useMemo, useState } from 'react';
import { ChevronRight, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';

interface SchemaType {
  name: string;
  description?: string;
  fields?: SchemaField[];
  inputFields?: SchemaField[];
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

interface SchemaStackItem {
  type: string;
  name: string;
  args?: SchemaInputValue[];
  text?: string;
}

interface DocumentationViewerProps {
  schema: {
    types: SchemaType[];
    queryType?: { name: string };
    mutationType?: { name: string };
    subscriptionType?: { name: string };
  };
}

const DocumentationViewer: React.FC<DocumentationViewerProps> = ({ schema }) => {
  const [currentPath, setCurrentPath] = useState<SchemaStackItem[]>([]);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const handleFieldClick = (item: SchemaStackItem) => {
    setCurrentPath([...currentPath, item]);
  };

  const handleBreadcrumbClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index));
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderBreadcrumbs = () => (
    <Breadcrumbs separator={<ChevronRight fontSize='small' />} aria-label='breadcrumb'>
      <Button onClick={() => setCurrentPath([])}>Root</Button>
      {currentPath.map((item, index) => (
        <Button
          key={item.name}
          onClick={() => handleBreadcrumbClick(index + 1)}
          disabled={index + 1 === currentPath.length}
        >
          {item.name}
        </Button>
      ))}
    </Breadcrumbs>
  );

  const renderFields = (fields: SchemaField[] | undefined, title: string) => {
    if (!fields || fields.length === 0) return null;

    return (
      <>
        <ListSubheader component='div'>
          <ListItemButton onClick={() => toggleSection(title)}>
            <ListItemText primary={title} />
            {openSections[title] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListSubheader>
        <Collapse in={openSections[title]} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {fields.map((field) => (
              <ListItem key={field.name} disablePadding>
                <ListItemButton
                  onClick={() =>
                    handleFieldClick({
                      type: field.type.name || field.type.kind,
                      name: field.name,
                      args: field.args,
                      text: `${field.name}: ${field.type.name || field.type.kind}${field.type.ofType ? ` of ${field.type.ofType.name || field.type.ofType.kind}` : ''}`,
                    })
                  }
                >
                  <ListItemText
                    primary={`${field.name}: ${field.type.name || field.type.kind}${field.type.ofType ? ` of ${field.type.ofType.name || field.type.ofType.kind}` : ''}`}
                    secondary={field.description}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  const currentType = useMemo(() => {
    if (currentPath.length === 0) return null;
    const currentTypeName = currentPath[currentPath.length - 1].type;
    return schema.types.find((type) => type.name === currentTypeName);
  }, [currentPath, schema.types]);

  const renderTypeDetails = (type: SchemaType) => (
    <Box>
      <Typography variant='h6'>{type.name}</Typography>
      {type.description && <Typography variant='body2'>{type.description}</Typography>}
      {renderFields(type.fields, 'Fields')}
      {renderFields(type.inputFields, 'Input Fields')}
      {type.enumValues &&
        renderFields(
          type.enumValues?.map((ev) => ({
            name: ev.name,
            type: { name: 'EnumValue', kind: 'ENUM' },
          })),
          'Enum Values',
        )}
      {type.interfaces &&
        renderFields(
          type.interfaces.map((i) => ({
            name: i.name,
            type: { name: 'Interface', kind: 'INTERFACE' },
          })),
          'Interfaces',
        )}
      {type.possibleTypes &&
        renderFields(
          type.possibleTypes.map((pt) => ({
            name: pt.name,
            type: { name: pt.name, kind: 'OBJECT' },
          })),
          'Possible Types',
        )}
    </Box>
  );

  const renderRootTypes = () => {
    const rootTypes = [
      { name: 'Query', type: schema.queryType },
      { name: 'Mutation', type: schema.mutationType },
      { name: 'Subscription', type: schema.subscriptionType },
    ].filter((rt) => rt.type);

    return (
      <Box>
        <Typography variant='h6'>Root Types</Typography>
        <List>
          {rootTypes.map((rt) => (
            <ListItem key={rt.name} disablePadding>
              <ListItemButton
                onClick={() => handleFieldClick({ type: rt.type!.name, name: rt.name })}
              >
                <ListItemText primary={rt.name} secondary={`Type: ${rt.type!.name}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography variant='h6' sx={{ mt: 2 }}>
          All Types
        </Typography>
        <List>
          {schema.types
            .filter((type) => !type.name.startsWith('__'))
            .map((type) => (
              <ListItem key={type.name} disablePadding>
                <ListItemButton
                  onClick={() => handleFieldClick({ type: type.name, name: type.name })}
                >
                  <ListItemText primary={type.name} secondary={type.description} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    );
  };

  const renderContent = () => {
    if (currentPath.length === 0) {
      return renderRootTypes();
    }

    if (currentType) {
      return renderTypeDetails(currentType);
    }

    return <Typography>Type not found</Typography>;
  };

  return (
    <Box>
      {renderBreadcrumbs()}
      <Divider sx={{ my: 2 }} />
      {renderContent()}
    </Box>
  );
};

export default DocumentationViewer;
