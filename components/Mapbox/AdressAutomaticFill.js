import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export function AddressAutofillComponent(props) {
  //   if (typeof window !== 'undefined') {
  //   }
  const AddressAutoFill = dynamic(() => import('./AddressAutofillExport.js'), { ssr: false });

  return (
    <Suspense fallback="Loading. . .">
      <AddressAutoFill
        accessToken={'pk.eyJ1IjoiaGF5dmFuYWRpOTgiLCJhIjoiY2xidmg0dnJsMDJ6dzN4dDdwaXpkZ3BvNSJ9.RBHAwiA1lqShS4lROZ10OQ'}>
        {props.children}
      </AddressAutoFill>
    </Suspense>
  );
}
