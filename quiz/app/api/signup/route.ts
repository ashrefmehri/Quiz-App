import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    try {
      const body = await request.json()
      const { username, email, password, role } = body
  
      if (!username || !email || !password || !role) {
        return NextResponse.json({ message: 'Champs obligatoires manquants' }, { status: 400 })
      }
  
      const existingEmail = await prisma.user.findUnique({
        where: { email }
      })
  
      if (existingEmail) {
        return NextResponse.json({ message: 'Cet email est déjà utilisé' }, { status: 400 })
      }
  
      const existingUsername = await prisma.user.findUnique({
        where: { username }
      })
  
      if (existingUsername) {
        return NextResponse.json({ message: 'Ce nom d\'utilisateur est déjà pris' }, { status: 400 })
      }
  
      const hashedPassword = await bcrypt.hash(password, 10)
  
      const user = await prisma.user.create({
        data: {
          username,
          email,
          role,
          password: hashedPassword,
        },
      })
  
      const { password: _, ...userWithoutPassword } = user
  
      return NextResponse.json(
        { message: 'Utilisateur créé avec succès', user: userWithoutPassword },
        { status: 201 }
      )
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      return NextResponse.json({ message: 'Une erreur est survenue' }, { status: 500 })
    }
  }
  
  

