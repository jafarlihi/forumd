import { BlitzPage } from "@blitzjs/next"
import { invoke } from "@blitzjs/rpc"
import { Avatar } from "@nextui-org/react"
import { User } from "@prisma/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "src/core/layouts/Layout"
import getUser from "src/users/queries/getUser"

const Profile: BlitzPage = (props: any) => {
  const router = useRouter()
  const [user, setUser] = useState<Omit<User, "hashedPassword"> | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await invoke(getUser, router.query.name))
    }
    void fetchUser()
  }, [router.query.name])

  return (
    <Layout title="Profile">
      <Avatar text={user?.name?.charAt(0)} size="xl" />
    </Layout>
  )
}

export default Profile
