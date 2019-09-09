import * as React from 'react';
import getColor from '../utils/colors';


export default function Cell(props) {
  const color = getColor(props);
  return (
    <>
      <span data-value={props.value} />
      <style jsx>
        {`
          span {
            background-color: ${color};
          }
        `}
      </style>
    </>
  );
}
