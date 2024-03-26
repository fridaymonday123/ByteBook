## Integrations

ByteBook supports many of the most popular tools on the market without any additional settings or configuration. Just paste links to a YouTube video, Figma file, or Google Spreadsheet to get instant live-embeds in your documents. Take a look at the [integrations directory](https://www.bytebook.ai/integrations) for a list of all of the tools that are supported.

\
Our integration code is also [open-source](https://github.com/fridaymonday123/ByteBook) and we encourage third party developers and the community to build support for additional tools! 

\
:::info
Most integrations work by simply pasting a link from a supported service into a document.
:::


## Slack

If your team is using Slack to communicate then you’ll definitely want to enable our [Slack Integration](/settings/integrations/slack) to get instant link unfurling for ByteBook documents and access to the `/outline` slash command to search your knowledge base directly from Slack.

## API

Have some technical skills? ByteBook is built on a fully featured RPC-style [API](https://www.bytebook.ai/developers). Create (or even append to) documents, collections, provision users, and more programmatically. All documents are edited and stored in markdown format – try out this example CURL request to get started:

```bash
curl -XPOST -H "Content-type: application/json" -d '{
  "title": "My first document",
  "text": "Hello from the API 👋",
  "collectionId": "COLLECTION_ID", // find the collection id in the URL bar
  "token": "API_TOKEN", // get an API token from https://www.bytebook.ai/settings/tokens
  "publish": true
}' 'https://www.bytebook.ai/api/documents.create'
```

