import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth"
const getData = async () => {
  const user = await getUserByClerkId()
  
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore:true
    }
  })
  
  const sum = analyses.reduce((all, current) =>  all + current.sentimentScore, 0)
  const avg = Math.round(sum/analyses.length)
  
  return { avg, analyses }
}
const History = async () => {
  const { avg, analyses } = await getData()
  console.log(analyses)
  return (
    <div>history: {avg}</div>
  )
}

export default History