import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from "langchain/prompts";
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    color: z
      .string()
      .describe('the hexidecimal color which represents the mood of the journal entry. for example, #0101fe for representing happiness'),
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    negative: z
      .boolean()
      .describe('is the journal entry negative? ie does it contain negative overtones or undertones?'),
    sentimentScore: z
      .number()
      .describe('Sentiment on the text and rated on the scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
    subject: z
      .string()
      .describe('the summary of the journa entry.'),
    summary: z
      .string()
      .describe('quick summary of the journal entry.'),
  })
)

const getPrompt = async entry => {
  const formatInstructions = parser.getFormatInstructions()

  const promptTemplate = new PromptTemplate({
    template: 'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {formatInstructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formatInstructions }
  })

  const input = await promptTemplate.format({ entry })

  return input
}

export const analyze = async prompt => {
  const input = await getPrompt(prompt)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }) // 'temperature' is silliness level
  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
}

export const qa = async (question, entries) => {
  const docs = entries.map(entry => new Document({
      pageContent: entry.content,
      metadata: { source: entry.id, date: entry.createdAt },
    })
  )

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)

  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
