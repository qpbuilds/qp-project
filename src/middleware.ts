// // Applies next-auth to whole site
// // Applies next-auth to whole site
export { default } from "next-auth/middleware"

// Allows public access to homepage and registration, took / out of matcher so the root route wasnt protected, as it wont be having the public dashboard which certain characteristics of peoples profiles showing
export const config = {matcher: []}