import { Badge, Spacer, useTheme } from "@nextui-org/react"
import { VscCircleLargeFilled } from "react-icons/vsc"

export default function CategoryPill(props: any) {
  const { isDark } = useTheme()

  return (
    <Badge
      isSquared
      size="sm"
      variant="flat"
      color={props.isSelected ? "primary" : "default"}
      style={{ color: !isDark ? "black" : "white", cursor: "pointer" }}
      onClick={props.onClick}
    >
      <VscCircleLargeFilled color={`#${props.category.color}`} size={10} style={{}} />
      <Spacer x={0.1} y={0} />
      {props.category.name}
    </Badge>
  )
}
