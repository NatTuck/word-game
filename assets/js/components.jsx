
import React from 'react';

export function Link(props) {
  props = Object.assign({href: "#"}, props);

  return (
    <a className="p-1 underline text-teal-600" {...props}>
      { props.children }
    </a>
  );
}
