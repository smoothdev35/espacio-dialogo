import type { Plugin } from "@opencode-ai/plugin";

export const RuntimeValidatorPlugin: Plugin = async ({ client }) => {
  return {
    event: async ({ event }) => {
      if (event.type === "session.compacted") {
        const sessionID = event.properties?.sessionID;
        if (!sessionID) return;

        await client.app.log({
          body: {
            service: "runtime-validator",
            level: "info",
            message: "Session compacted. Invoking runtime-validator subagent checkpoint...",
          },
        });

        await client.session.prompt({
          path: { id: sessionID },
          body: {
            agent: "runtime-validator",
            parts: [
              {
                type: "text",
                text: "Session milestone reached. Initialize browser context, read console logs, and identify if any uncaught exceptions or critical assets failures exist. If clear, terminate immediately.",
              },
            ],
          },
        });
      }
    },
  };
};

export default RuntimeValidatorPlugin;