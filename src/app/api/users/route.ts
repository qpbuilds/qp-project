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
            return NextResponse.json({
                success: 'false',
                error: `${email} already exists`
            }, { status: 403 })
        }

    } catch(e) {
        console.error(`Error checking for duplicate emails: ${e}`);
        return NextResponse.json(
            {
                error: 'server error',
                success: false
            }, { status: 500 })
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
        return NextResponse.json({email: user.email}, { status: 201 })

    } catch(e) {
        console.error(`Error creating user: ${e}`)
        return NextResponse.json({
            error: `server error`,
            success: false
        }, { status: 500 })
    }
}

export async function GET(req: NextRequest){
    // Get User Information
    try {
        const users = await prisma.user.findMany({ select: 
            {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                image: true
            }
        })
        console.log(users)
        return NextResponse.json({users}, { status: 201 })
    } catch(e){
        console.error(`Error getting users: ${e}`)
        return NextResponse.json({
            error: `server error`,
            success: false
        }, { status: 500 })
    }
}