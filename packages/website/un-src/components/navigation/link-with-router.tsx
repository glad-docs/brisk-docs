import * as React from 'react';
import { Item } from '@atlaskit/navigation-next';
import { colors } from '@atlaskit/theme';
import { Location } from '@reach/router';
import { Link } from 'gatsby';

// TODO TSFix - find out if we can actually get the prop types of withRouter
// here instead of defining our own
export type Props = {
  text: string;
  href: string;
  id?: string;
  isHeading?: boolean;
};

const NavLink = ({ text, href, isHeading }) => {
  return (
    <Location>
      {locationProps => {
        const pathName = locationProps.location.pathname;
        return (
          <Item
            // @ts-ignore
            styles={styles => ({
              ...styles,
              itemBase: {
                ...styles.itemBase,
                paddingLeft: '4px',
                height: '32px',
              },
              textWrapper: {
                ...styles.textWrapper,
                color: isHeading ? colors.N800 : colors.N200,
              },
            })}
            isSelected={pathName === href}
            text={text}
            href={href}
            component={({ className, children, href }) => {
              return ( <Link className={className} to={href}>{children}</Link>)
            }}
          />
        )
      }}
    </Location>
  )
}

export default NavLink;
