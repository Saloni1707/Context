type GenerateTextInput = {
    model: any;
    prompt: string;
};

type GenerateTextOutput = {
    text: string;
};

type GenerateTextFn = (args: GenerateTextInput) => Promise<GenerateTextOutput>;

type withAlchemystOptions = {
    // diff options
};

type WithMemoryInput = GenerateTextInput & {
    userId: string;
    conversationId: string;
};

const memoryStore = new Map<
    string,
    { role: "user" | "assistant"; content: string }[]
>();

export function withAlchemyst(
    generateText: GenerateTextFn,
    _options: withAlchemystOptions
) {
    return async function generateTextWithMemory(
        args: WithMemoryInput
    ): Promise<GenerateTextOutput> {
        const { model, prompt, userId, conversationId } = args;

        const memoryKey = `${userId}::${conversationId}`;

        const history = memoryStore.get(memoryKey) || [];

        const context = history
            .map(
                (m) =>
                    `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
            )
            .join("\n");

        const fullPrompt = context ? `${context}\nUser: ${prompt}` : prompt;

        const result = await generateText({
            model,
            prompt: fullPrompt,
        });

        const updatedHistory:{role:"user" | "assistant";content:string}[] = [
            ...history,
            { role: "user", content: prompt },
            { role: "assistant", content: result.text },
        ];

        memoryStore.set(memoryKey, updatedHistory);

        return result;
    };
}

export function getMemory(userId: string, conversationId: string) {
    const memoryKey = `${userId}::${conversationId}`;
    return memoryStore.get(memoryKey) || [];
  }
  