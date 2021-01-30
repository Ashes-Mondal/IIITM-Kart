const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const sessionId = uuid.v4();

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
exports.runSample = async (req, res) => {
  // A unique identifier for the given session
  const projectId = "chatbot-bqhm";
  const text = req.body.text;
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: text,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  res.send({ response: true, reply: result.fulfillmentText });
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
};
