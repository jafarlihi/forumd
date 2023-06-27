export const getUsername = (currentUser): string => {
  if (currentUser.name) return currentUser.name
  return currentUser.email.substring(0, currentUser.email.indexOf("@"))
}

export const generateRandomHexColor = (): string => {
  return ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
}
