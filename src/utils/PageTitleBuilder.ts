export function PageTitleBuilder(title: string | undefined) {
  return `${process.env.SITE_TITLE}${title!=undefined?` | ${title}`:''}`;
}
