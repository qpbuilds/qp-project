// Applies next-auth to whole site
export { default } from "next-auth/middleware"

// Protects only the root currently for development and testing purposes
export const config = {matcher: ['/']}