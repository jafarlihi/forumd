import {
  Navbar,
  Button,
  Text,
  Switch,
  useTheme,
  useModal,
  Dropdown,
  Spacer,
  Avatar,
} from "@nextui-org/react"
import { BsSun, BsMoon } from "react-icons/bs"
import { useTheme as useNextTheme } from "next-themes"
import { APP_NAME } from "../constants"
import { getUsername } from "../utils"
import LoginRegisterModal from "./LoginRegisterModal"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { AiOutlineUser } from "react-icons/ai"
import { PiChatsBold } from "react-icons/pi"
import { IoSettingsOutline } from "react-icons/io5"
import { BiLogOut } from "react-icons/bi"
import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Header(props: any) {
  const router = useRouter()
  const { setTheme } = useNextTheme()
  const { isDark, theme } = useTheme()
  const { setVisible: setLoginRegisterModalVisible, bindings: loginRegisterModalBindings } =
    useModal()
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [selection, setSelection] = useState<any>()

  useEffect(() => {
    if (selection?.currentKey === "logout") void logoutMutation()
    if (selection?.currentKey === "theme") setTheme(isDark ? "light" : "dark")
    if (selection?.currentKey === "settings") void router.push("/settings")
    setSelection("")
  }, [selection, logoutMutation, isDark, setTheme, router])

  return (
    <>
      <Navbar isCompact isBordered variant="sticky">
        <Navbar.Brand>
          <Text
            b
            color="inherit"
            hideIn="xs"
            onClick={async () => await router.push("/")}
            style={{ cursor: "pointer" }}
          >
            {APP_NAME}
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="underline"></Navbar.Content>
        <Navbar.Content>
          {!currentUser ? (
            <Navbar.Item>
              <Button
                auto
                flat
                size="sm"
                bordered
                ghost
                color="gradient"
                onClick={() => setLoginRegisterModalVisible(true)}
              >
                Sign in
              </Button>
            </Navbar.Item>
          ) : (
            <Dropdown>
              <Dropdown.Button bordered>
                <Avatar size="sm" /> <Spacer x={0.3} /> {getUsername(currentUser)}
              </Dropdown.Button>
              <Dropdown.Menu onSelectionChange={setSelection} selectionMode="single">
                <Dropdown.Item key="profile" icon={<AiOutlineUser />}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item key="chat" icon={<PiChatsBold />}>
                  Chat
                </Dropdown.Item>
                <Dropdown.Item key="settings" icon={<IoSettingsOutline />}>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item key="theme" icon={<BsMoon />}>
                  <div>
                    Dark mode
                    <Switch
                      style={{ float: "right", padding: "0" }}
                      icon={!isDark ? <BsSun /> : <BsMoon />}
                      checked={isDark}
                    />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item withDivider key="logout" color="error" icon={<BiLogOut />}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {!currentUser && (
            <Switch
              icon={!isDark ? <BsSun /> : <BsMoon />}
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          )}
        </Navbar.Content>
      </Navbar>
      <LoginRegisterModal
        setVisible={setLoginRegisterModalVisible}
        bindings={loginRegisterModalBindings}
        theme={theme}
      />
    </>
  )
}
