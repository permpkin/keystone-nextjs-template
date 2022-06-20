import { css } from '@emotion/css';

export const style = {
  wrapper: css`
    margin-top: -15px;
    border-radius: 6px;
    border: 1px solid #e1e5e9;
    padding: 0 10px;
    display: flex;
    font-size: 13px;
    position: relative;
  `,
  wrapper__editing: css`
    margin-top: -15px;
    border-radius: 6px;
    border: 1px solid #e1e5e9;
    padding: 0 10px;
    display: flex;
    font-size: 13px;
    position: relative;
    background-color: white;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #bfdbfe;
  `,
  segment: css`
    color: #374151;
    display: block;
    padding: 8px 0;
    text-decoration: none;
  `,
  segment_disabled: css`
    color: #374151;
    display: block;
    padding: 8px 0;
    opacity: 0.65;
  `,
  link: css`
    color: #374151;
    display: flex;
    text-decoration: none;
  `,
  toggle: css`
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    height: 100%;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  input: css`
    flex-grow: 1;
    margin-right: 35px;
    margin-left: 5px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
    border-left: 1px solid #e1e5e9;
    border-right: 1px solid #e1e5e9;
  `
};