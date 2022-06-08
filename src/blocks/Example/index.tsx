import style from "./style.module.scss"

export default function Example({ title, content }:{ title?: string, content?: string }) {
  return (
    <div className={style.wrapper}>
      <h1 className={style.heading}>{title || "Example Block"}</h1>
      <p>{content}</p>
    </div>
  )
}