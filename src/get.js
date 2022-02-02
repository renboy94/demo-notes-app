import handler from "./util/handler";
import dynamoDB from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters.id,
    },
  };

  const result = await dynamoDB.get(params);

  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});
