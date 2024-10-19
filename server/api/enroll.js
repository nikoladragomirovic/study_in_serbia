import { sendToClient } from "../routes/_ws";
import { createHmac } from "crypto";

const getFieldByLabel = (fields, label) => {
  return fields.find((field) => field.label === label)?.value ?? "";
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const signingSignature = getHeader(event, "tally-signature");
  const signingSecret = config.tallySigningSecret;
  const fields = body.data.fields;
  const clientId = getFieldByLabel(fields, "user_id");

  const messageContent = {
    firstName: getFieldByLabel(fields, "First Name"),
    lastName: getFieldByLabel(fields, "Last Name"),
    email: getFieldByLabel(fields, "E-mail Address"),
    customAnswers: {
      a2: getFieldByLabel(fields, "Phone Number"),
    },
  };

  const calculatedSignature = createHmac("sha256", signingSecret)
    .update(JSON.stringify(body))
    .digest("base64");

  if (signingSignature === calculatedSignature) {
    sendToClient(clientId, {
      user: "webhook",
      message: messageContent,
      timestamp: new Date().toISOString(),
    });

    return { status: "ok" };
  }

  return { status: "Invalid Signing Signature" };
});
