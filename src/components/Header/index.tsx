// import { GetStaticProps } from "next";

// import { query } from '.keystone/api';
import { GetServerSideProps } from 'next';

import style from "./style.module.scss"

export default function Header({ routes }:{ routes?: { path: string }[] }) {

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

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  // const routes = await query.Page.findMany({
  //   query: `title path { prefix path }`
  // });

  return {
    props: {
      routes: []
    }
  }

}