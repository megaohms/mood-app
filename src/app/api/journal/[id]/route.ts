import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { analyze } from "@/utils/ai";

export const PATCH = async (request, { params }) => {
  const [user, { content }] = await Promise.all([getUserByClerkId(), request.json()])

  const [analysis, updatedEntry] = await Promise.all([
    analyze(content),
    prisma.journalEntry.update({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id
        }
      },
      data: {
        content,
      }
    })
  ])

  await prisma.analysis.upsert({
    where: { entryId: updatedEntry.id },
    create: { ...analysis, entryId: updatedEntry.id },
    update: analysis,
  })

  return NextResponse.json({ data: { ...updatedEntry, analysis } })
}