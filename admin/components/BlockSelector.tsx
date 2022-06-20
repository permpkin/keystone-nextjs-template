import { css } from '@emotion/css';
import { EnabledBlocks } from "../../src/blocks/enabled";

export const style = {
  wrapper: css`
    flex-grow: 1;
    padding: 30px;
    text-align: center;
    border: 2px dashed #3b82f6;
    border-radius: 6px;
  `,
  heading: css`
    font-weight: bold;
  `
};

export const BlockSelector = ({ onSelect }: { onSelect: Function }) => {
  return (
    <div className={style.wrapper}>
      <select onChange={(e) => {
        if (e.target.value === "") return;
        onSelect(e.target.value)
      }}>
        <option value="">Select Block</option>
        {
          EnabledBlocks.map(([ key, label ], index) => (
            <option key={`block-type-${index}`} value={key}>{label}</option>
          ))
        }
      </select>
    </div>
  )
}