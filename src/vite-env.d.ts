/// <reference types="vite/client" />

import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "gmp-place-autocomplete": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          placeholder?: string;
          value?: string;
          onGmpPlaceSelect?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
    }
  }
}
