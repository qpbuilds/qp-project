import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '../../lib/prismadb'

export async function POST(req: NextRequest){
    const data = await req.formData()
    const firstName = data.get('firstName') as string
    const lastName = data.get('lastName') as string
    const email = data.get('email') as string
    const password = data.get('password') as string
    
    // Check for duplicates
    try{
        const existingUser = await prisma.user.findUnique({
        where: {
            email:email
        }
        })

        // If duplicate exists return 403 forbidden
        if(existingUser){
            console.error(`Error: ${email} already exists`)
            return NextResponse.json({Error: `${email} already exists`}, { status: 403 })
        }

    } catch(e) {
        console.error(e);
        return NextResponse.json({success: false}, { status: 500 })
    }

    // Hash Password for security
    const hashedPassword = await bcrypt.hash(password, 10)

    // Add user to database
    try {
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                hashedPassword,
            }
        })
        return NextResponse.json({email: user.email}, { status: 200 })

    } catch(e) {
        console.error(e);
        return NextResponse.json({success: false}, { status: 500 })
    }
}