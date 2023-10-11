"use client"
import { FormEvent, useState } from 'react'

export default function Register() {
  interface FormProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmation: string;
  }

  const initialState: FormProps = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmation: ""
  }

  const [formState, setFormState] = useState((initialState))

  async function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users`, {
      method: 'POST', 
      body: formData
    })
  }

  function updateFormState(e: any) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <section className='max-w-sm rounded overflow-hidden shadow-lg flex flex-wrap gap-5  justify-around'>
        <h1> Register </h1>
        <form onSubmit={onSubmit} className='flex flex-wrap gap-2  justify-start'>
          <p>
            <label htmlFor='firstName'>First Name:<span aria-label='required'>*</span></label>
            <input type='text' id='firstName' name='firstName' value={formState.firstName} onChange={updateFormState} required/>
          </p>
          <p>
            <label htmlFor='lastName'>Last Name:<span aria-label='required'>*</span></label>
            <input type='lastName' id='lastName' name='lastName' value={formState.lastName} onChange={updateFormState} required/>
          </p>
          <p>
            <label htmlFor='email'>Email:<span aria-label='required'>*</span></label>
            <input type='email' id='email' name='email' value={formState.email} onChange={updateFormState} required/>
          </p>
          <p>
            <label htmlFor='password'>Password:<span aria-label='required'>*</span></label>
            <input type='password' id='password' name='password' value={formState.password} onChange={updateFormState} required/>
          </p>

          <p>
            <label htmlFor='confirmation'>Confirm Password:<span aria-label='required'>*</span></label>
            <input type='password' id='confirmation' name='confirmation' value={formState.confirmation} onChange={updateFormState} required/>
          </p>

          <button type='submit' className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">Create Account</button>
        </form>
      </section>
    </main>
  )
}
