import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from "langchain/prompts";
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    color: z
      .string()
      .describe('the hexidecimal color which represents the mood of the journal entry. for example, #0101fe for representing happiness'),
    subject: z
      .string()
      .describe('the summary of the journa entry.'),
    summary: z
      .string()
      .describe('quick summary of the journal entry.'),
    negative: z
      .boolean()
      .describe('is the journal entry negative? ie does it contain negative overtones or undertones?'),
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
  const model = await new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }) // 'temperature' is silliness level
  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
}
