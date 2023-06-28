import { Avatar, Badge, Spacer, Text } from "@nextui-org/react"
import { IoChatbubblesSharp } from "react-icons/io5"
import dateFormat from "dateformat"
import { Category, Thread, User } from "@prisma/client"
import styles from "./ThreadCard.module.css"

interface ThreadCardProps {
  thread: Thread & { categories: Category[]; creator: Pick<User, "id" | "name" | "avatar"> }
}

export default function TheadCard(props: ThreadCardProps) {
  return (
    <div className={styles.wrapper}>
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
      <div
        style={{
          display: "flex",
          height: "auto",
          alignItems: "center",
          justifyContent: "end",
          width: `${props.thread.categories.length * 42 + 35}px`,
        }}
      >
        {props.thread.categories.map((c) => (
          <>
            <div style={{ width: "65px" }}>
              <div style={{ float: "right" }}>
                <Badge
                  isSquared
                  size="sm"
                  variant="flat"
                  style={{
                    color: "white",
                    backgroundColor: `#${c.color}`,
                    height: "23.6875px",
                  }}
                >
                  {c.name}
                </Badge>
              </div>
            </div>
          </>
        ))}
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
