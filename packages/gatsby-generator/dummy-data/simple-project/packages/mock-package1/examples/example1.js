import React from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { caption, head, rows } from './content/sample-data';

// prettier-ignore
const Example1 = () => (
    <DynamicTable
        caption={caption}
        head={head}
        rows={rows}
        rowsPerPage={10}
        defaultPage={1}
        loadingSpinnerSize="large"
        isLoading={false}
        isFixedSize
        defaultSortKey="term"
        defaultSortOrder="ASC"
    />
);

export default Example1;
