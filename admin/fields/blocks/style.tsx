import { css } from '@emotion/css';

export const style = {
  list: {
    ul: css`
      list-style: none;
      margin: 0;
      padding: 0;
      border: 2px solid #f0f0f0;
      border-radius: 5px;
      overflow: hidden;
      &> div:hover > div:first-child:not(:last-child) {
        display: flex;
      }
    `,
    li: css`
      display: flex;
      position: relative;
      overflow: hidden;
      align-items: center;
      flex-wrap: nowrap;
      flex-grow: 1;
      border-bottom: 2px solid #f0f0f0;
      &:last-child {
        border-bottom: none;
      }
    `
  },
  actions: {
    option: css`
    `,
    wrapper: css`
      position: absolute;
      top: 5px;
      left: 5px;
      display: none;
      bottom: 5px;
      flex-direction: column;
      justify-content: space-between;
    `,
    row: css`
      margin-top: 5px;
      width: 100%;
    `
  },
  search: {
    wrapper: css`
      padding: 1em;
    `,
    results: css`
      margin-top: .5em;
      overflow-y: auto;
      width: 250px;
      min-height: 150px;
      border-radius: 6px;
      border: 2px solid #f0f0f0;
    `,
    result: css`
      width: 100%;
      background-color: #fff;
      justify-content: flex-start;
      border-radius: 0;
    `
  },
  editor: {
    wrapper: css`
      padding: 12px;
      background-color: #f0f0f0;
      border: 2px solid #ccc;
      margin-top: 24px;
    `,
    fields: css`
    `
  }
};