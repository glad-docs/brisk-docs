import * as React from 'react';
import Table from '@atlaskit/dynamic-table';

import styled from 'styled-components';
import { Link } from 'gatsby';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import titleCase from 'title-case';

import Page, { Title, Section } from '../un-src/components/page';
import NavigationWrapper from '../un-src/components/navigation-wrapper';
import AllPackagesNavContent from '../un-src/components/navigation/all-packages-nav-content';

import data from '../un-src/pages-list';
// @ts-ignore - ts cannot resolve file when it doesn't exist, which it won't always
import meta2 from '../data/packages-data.json';
import PageTitle from '../un-src/components/page-title';

import { PackageInfo, PackageMetadata } from '../types';

const meta: PackageMetadata = meta2;

const gridSize = gridSizeFn();

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 20,
    },
    {
      key: 'description',
      content: 'Description',
      shouldTruncate: true,
      isSortable: false,
      width: 45,
    },
    {
      key: 'version',
      content: 'Version',
      shouldTruncate: true,
      isSortable: false,
      width: 15,
    },
    {
      key: 'maintainers',
      content: 'Maintainers',
      shouldTruncate: true,
      isSortable: false,
      width: 40,
    },
  ],
};

const MaintainersToString = (maintainers: PackageInfo['maintainers']) => {
  if (Array.isArray(maintainers)) return maintainers.join(', ');
  if (typeof maintainers === 'string') return maintainers;
  return '';
};

const getDisplayName = (
  packageId: string,
  parentId: string,
  packageTitle?: string,
) => {
  const name = packageTitle ? titleCase(packageTitle) : titleCase(packageId);
  return `${titleCase(parentId.split('/').join(' '))} - ${name}`;
};

const renderRow = ({
  packageId,
  homePath,
  parentId,
  packageTitle,
}: PackageInfo) => {
  const metaData = meta.metaData.find(x => x.id === packageId);
  let display = titleCase(packageId);
  if (parentId) {
    display = getDisplayName(packageId, parentId, packageTitle);
  } else if (packageTitle) {
    display = titleCase(packageTitle);
  }

  if (!metaData) return {};
  return {
    cells: [
      {
        key: packageId,
        content: (
          <RowCell>
            <Link to={homePath}>{display}</Link>
          </RowCell>
        ),
      },
      {
        key: 'description',
        content: <RowCell>{metaData.description}</RowCell>,
      },
      {
        key: 'version',
        shouldTruncate: true,
        content: <RowCell>{metaData.version}</RowCell>,
      },
      {
        key: 'maintainers',
        content: <RowCell>{MaintainersToString(metaData.maintainers)}</RowCell>,
      },
    ],
  };
};

const GetRows = () => data.packages.map(item => renderRow(item));

const PackagesList = () => (
  <Page>
    <Title>Brisk Documentation</Title>
    <Section>
      <Table
        head={head}
        rows={GetRows()}
        defaultSortKey="name"
        defaultSortOrder="ASC"
      />
    </Section>
  </Page>
);

// Tabular data
const RowCell = styled.div`
  padding-bottom: ${gridSize}px;
  padding-top: ${gridSize}px;
`;

const Index = () => (
  <>
    <PageTitle title="Packages" />
    <NavigationWrapper
      navContent={() => <AllPackagesNavContent data={data.packages} />}
    >
      <PackagesList />
    </NavigationWrapper>
  </>
);
export default Index;
