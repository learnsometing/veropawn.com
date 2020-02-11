import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExpandableSection from '../expandable-section/expandable-section';

describe('ExpandableSection', () => {
  it('should render correctly when !isExpanded', () => {
    var { queryByRole, queryByText } = render(
      <ExpandableSection heading={'Heading'}>
        <p>
          Foo
        </p>
      </ExpandableSection>
    );

    var expand = queryByRole('button');

    expect(queryByText('Heading')).toBeInTheDocument();
    expect(expand).toBeInTheDocument();
  });

  it('should render correctly when isExpanded', () => {
    var { queryByRole, queryByText } = render(
      <ExpandableSection heading={'Heading'}>
        <p>
          Foo
        </p>
        <p>
          Bar
        </p>
      </ExpandableSection>
    );

    var expand = queryByRole('button');

    fireEvent.click(expand);

    expect(queryByText('Foo')).toBeInTheDocument();
    expect(queryByText('Bar')).toBeInTheDocument();
  });
});