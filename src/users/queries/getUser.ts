import db from "db"

export default async function getCurrentUser(name: string) {
  const user = await db.user.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      avatar: true,
    },
  })

  return user
}
