import Link from "next/link"
import { useRouter } from "next/router"
import style from "./style.module.scss"

export default function Header({ pages }:{ pages?: { title: string, path: string }[] }) {

  const { asPath } = useRouter()

  return (
    <header className={style.header}>
      HEADER
      <nav>
        NAV_MENU
        <ul>
          {
            pages && pages.map((page: any, index: number) => {
              return (
                <li key={`menu-${index}`}>
                  <Link href={page.path||"/"}>
                    <a>
                      {`${page.title}${asPath===`/${page.path}`?'(this page)':''}`}
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </header>
  )
}