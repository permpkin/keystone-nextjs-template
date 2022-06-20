import { Fragment } from "react"
import { BlockProps } from "./PageBlocksLayout"

export const PageBlocks = ({ blocks }: { blocks: BlockProps }): JSX.Element => {
  return (
    <Fragment>
      {
        blocks.map((block: any, index: number) => {
          const { View } = require(`@/blocks/${block.type}/`)
          if (!View) {
            return (
              <div>
                Error: {block.type} missing view.
              </div>
            )
          }
          return (
            <View key={`block-${index}`} {...block.props}/>
          )
        })
      }
    </Fragment>
  )
}