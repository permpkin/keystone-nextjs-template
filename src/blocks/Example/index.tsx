import { style } from './style';

export const View = ({ title, content }:{ title?: string, content?: string }) => {
  return (
      <div className={style.wrapper}>
        <h1 className={style.heading}>{title || "Example Block"}</h1>
        <p>{content}</p>
      </div>
  )
}