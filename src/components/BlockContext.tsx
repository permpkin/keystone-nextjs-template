import { Fragment } from "react";

export default function BlockContext({ children }: { children: JSX.Element }) {
  // TODO: apply context if session exists.
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}