'use client'

export default function Register() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>

      <h1> Register </h1>
      <form action='{ process.env.API_URI + /register}' method='POST'>
        <label htmlFor='email'>Email: </label>
        <input id='email'/>
        <label htmlFor='password'>Password: </label>
        <input id='password'/>
        <button type='submit'>Create Account</button>
      </form>
      
    </main>
  )
}
