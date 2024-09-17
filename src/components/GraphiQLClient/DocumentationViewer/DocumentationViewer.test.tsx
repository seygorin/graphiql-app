import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DocumentationViewer from './DocumentationViewer';

const mockSchema = {
  types: [
    {
      name: 'Query',
      description: 'Root query type',
      fields: [
        {
          name: 'user',
          description: 'Get user by ID',
          type: { name: 'User', kind: 'OBJECT' },
          args: [{ name: 'id', type: { name: 'ID', kind: 'SCALAR' } }],
        },
      ],
    },
    {
      name: 'User',
      description: 'User type',
      fields: [
        { name: 'id', type: { name: 'ID', kind: 'SCALAR' } },
        { name: 'name', type: { name: 'String', kind: 'SCALAR' } },
      ],
    },
  ],
  queryType: { name: 'Query' },
};

describe('DocumentationViewer', () => {
  it('renders DocumentationViewer component', () => {
    render(<DocumentationViewer schema={mockSchema} />);
    expect(screen.getByText('Root Types')).toBeInTheDocument();
    expect(screen.getByText('All Types')).toBeInTheDocument();
  });

  it('displays all types', () => {
    render(<DocumentationViewer schema={mockSchema} />);
    expect(screen.getByText('User')).toBeInTheDocument();
  });
});
