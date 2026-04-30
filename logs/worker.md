[WORKER] [17:41:39 UTC] ERROR: fetchRss error
[WORKER]     env: "development"
[WORKER]     service: "ingestion-worker"
[WORKER]     feedUrl: "https://www.investopedia.com/feedbuilder/feed/getfeed/?feedName=market-news"
[WORKER]     err: {
[WORKER]       "type": "Error",
[WORKER]       "message": "Status code 402",
[WORKER]       "stack":
[WORKER]           Error: Status code 402
[WORKER]               at ClientRequest.<anonymous> (C:\Users\MY NOTEBOOK\Desktop\finmate.dev\node_modules\.pnpm\rss-parser@3.13.0\node_modules\rss-parser\lib\parser.js:88:25)
[WORKER]               at Object.onceWrapper (node:events:633:26)
[WORKER]               at ClientRequest.emit (node:events:518:28)
[WORKER]               at HTTPParser.parserOnIncomingClient [as onIncoming] (node:_http_client:716:27)
[WORKER]               at HTTPParser.parserOnHeadersComplete (node:_http_common:117:17)
[WORKER]               at TLSSocket.socketOnData (node:_http_client:558:22)
[WORKER]               at TLSSocket.emit (node:events:518:28)
[WORKER]               at addChunk (node:internal/streams/readable:561:12)
[WORKER]               at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
[WORKER]               at TLSSocket.Readable.push (node:internal/streams/readable:392:5)
[WORKER]     }

[WORKER] [17:41:39 UTC] ERROR: fetchRss error
[WORKER]     env: "development"
[WORKER]     service: "ingestion-worker"
[WORKER]     feedUrl: "https://www.moneycontrol.com/rss/latestnews.xml"
[WORKER]     err: {
[WORKER]       "type": "Error",
[WORKER]       "message": "Status code 403",
[WORKER]       "stack":
[WORKER]           Error: Status code 403
[WORKER]               at ClientRequest.<anonymous> (C:\Users\MY NOTEBOOK\Desktop\finmate.dev\node_modules\.pnpm\rss-parser@3.13.0\node_modules\rss-parser\lib\parser.js:88:25)
[WORKER]               at Object.onceWrapper (node:events:633:26)
[WORKER]               at ClientRequest.emit (node:events:518:28)
[WORKER]               at HTTPParser.parserOnIncomingClient (node:_http_client:716:27)
[WORKER]               at HTTPParser.parserOnHeadersComplete (node:_http_common:117:17)
[WORKER]               at TLSSocket.socketOnData (node:_http_client:558:22)
[WORKER]               at TLSSocket.emit (node:events:518:28)
[WORKER]               at addChunk (node:internal/streams/readable:561:12)
[WORKER]               at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
[WORKER]               at TLSSocket.Readable.push (node:internal/streams/readable:392:5)
[WORKER]     }