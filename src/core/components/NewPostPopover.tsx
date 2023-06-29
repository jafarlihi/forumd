import React, { SyntheticEvent, useState } from "react"
import { ResizeCallbackData, Resizable } from "react-resizable"
import { useWindowSize } from "usehooks-ts"
import { MdDragHandle } from "react-icons/md"

export default function NewPostPopover(props: any) {
  const { width, height } = useWindowSize()
  const [newPostPopoverHeight, setNewPostPopoverHeight] = useState(300)

  const onResize = (_event: SyntheticEvent, data: ResizeCallbackData) => {
    setNewPostPopoverHeight(data.size.height)
  }

  return (
    <>
      {props.visible && (
        <Resizable
          height={newPostPopoverHeight}
          width={width}
          onResize={onResize}
          handle={
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                cursor: "ns-resize",
              }}
            >
              <MdDragHandle />
            </div>
          }
          axis="y"
          resizeHandles={["n"]}
          lockAspectRatio={true}
          transformScale={1}
          minConstraints={[150, 150]}
          maxConstraints={[height - 54, height - 54]}
        >
          <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              height: newPostPopoverHeight + "px",
              backgroundColor: "rgba(120, 120, 120, 0.5)",
              zIndex: "100",
            }}
          ></div>
        </Resizable>
      )}
    </>
  )
}
