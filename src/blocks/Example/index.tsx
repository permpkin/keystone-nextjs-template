import BlockContext from '../../components/BlockContext';
import { style } from './style';

export default function Example({ title, content }:{ title?: string, content?: string }) {
  return (
    <BlockContext>
      <div className={style.wrapper}>
        <h1 className={style.heading}>{title || "Example Block"}</h1>
        <p>{content}</p>
      </div>
    </BlockContext>
  )
}