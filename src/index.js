import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import { COLORS } from './styles';
import App from './App';

const ROOT_NODE_ID = 'root';

const styles = css`
  * {
    font-family: 'Lato', sans-serif;
    text-transform: uppercase;
    color: ${COLORS.BLACK};
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #${ROOT_NODE_ID} {
    height: 100%;
  }

  #${ROOT_NODE_ID} {
    display: flex;
    flex-direction: column;
  }
`;

ReactDOM.render(
  <Fragment>
    <Global styles={styles} />
    <App />
  </Fragment>,
  document.getElementById(ROOT_NODE_ID)
);
