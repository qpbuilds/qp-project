// Applies next-auth to whole site
export { default } from "next-auth/middleware"

// Allows public access to homepage and registration
export const config = {matcher: ['/']}