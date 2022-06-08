// import { GetStaticProps } from "next";

// import { query } from '.keystone/api';

import style from "./style.module.scss"

// export default function Header({ routes }: any) {
export default function Header() {
  const routes = [{path:"/"},{path:"/test-page"}]
  return (
    <header className={style.header}>
      HEADER_MENU
      <nav>
        <ul>
          {
            routes && routes.map((route: any, index: number) => {
              return (
                <li key={`menu-${index}`}>
                  <a href={route.path}>{route.path}</a>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </header>
  )
}