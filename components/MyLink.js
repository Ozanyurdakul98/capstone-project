import Link from 'next/link';
import { forwardRef } from 'react';

export const MyLink = forwardRef((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});
MyLink.displayName = 'MyComponent';
