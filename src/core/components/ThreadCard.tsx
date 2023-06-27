import { Avatar, Badge, Spacer, Text } from "@nextui-org/react"
import { IoChatbubblesSharp } from "react-icons/io5"
import dateFormat from "dateformat"
import { Category, Thread, User } from "@prisma/client"

interface ThreadCardProps {
  thread: Thread & { categories: Category[]; creator: Pick<User, "id" | "name" | "avatar"> }
}

export default function TheadCard(props: ThreadCardProps) {
  return (
    <div style={{ display: "flex", width: "100%", height: "auto" }}>
      {!props.thread.creator.avatar ? (
        <Avatar text={props.thread.creator.name?.toUpperCase().charAt(0)} />
      ) : (
        <Avatar />
      )}
      <Spacer x={0.5} />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Text h5 style={{ margin: "0" }}>
          {props.thread.title}
        </Text>
        <Text h6 color="gray" style={{ margin: "0" }} size={11}>
          {dateFormat(props.thread.createdAt, "ddd mmm d yyyy")}
        </Text>
      </div>
      <div style={{ display: "flex", height: "100%", alignItems: "center", width: "100px" }}>
        <div style={{ width: "65px" }}>
          <div style={{ float: "right" }}>
            <Badge
              isSquared
              size="sm"
              variant="flat"
              style={{
                color: "white",
                backgroundColor: `#${props.thread.categories[0]?.color}`,
                height: "23.6875px",
              }}
            >
              {props.thread.categories[0]?.name}
            </Badge>
          </div>
        </div>
        <Spacer x={0.3} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            width: "35px",
          }}
        >
          <IoChatbubblesSharp />
          <Text h6 style={{ margin: "0", marginLeft: "2px" }}>
            {props.thread.postCount}
          </Text>
        </div>
      </div>
      <Spacer x={2} />
    </div>
  )
}
