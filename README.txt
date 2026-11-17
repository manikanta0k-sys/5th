CRYPTO IDX LEARNING MONITOR V3 — FREE, READ-ONLY DEMO RESEARCH

WHAT IS NEW
- Auto-saving of the first eligible 1-minute and 4-minute pixel-based prediction BEFORE the target candle starts. It is never overwritten afterward.
- After the target expiry, compares later detected candle direction with the frozen prediction and labels a VIRTUAL / VISUAL-PROXY WIN, LOSS, TIE or UNVERIFIED.
- WIN/LOSS = research prediction match/mismatch, NOT a settled Binomo demo or real-money trade. Do not treat the 'visual match rate' as your actual win rate.
- After a visual LOSS: 4-minute general pause and 10-minute pause for a similar pattern. Long-term underperforming visual patterns are blocked after >=12 observations and <45% visual matches. These are heuristic risk filters and cannot prevent future losses.
- Every minute with a usable live chart, stores a compact 24-candle visual shape sample, indicator votes, source time, quality and reasoning locally using IndexedDB. No screenshots, passwords, account data or broker feeds are stored or transmitted.
- Export complete data (JSON) for future reuse, export signal CSV, import JSON backup, and optionally review the broker's demo result manually.
- Browser stays open with a valid live screen share and same 1-minute chart; screen share cannot run as a background cloud service.

IMPORTANT SOURCE CONSTRAINT
Binomo Crypto IDX is an internal synthetic index with no verified, freely available exact OHLC public data API. Binance/Kraken prices are DIFFERENT. This project reads only pixels from the chart YOU choose to share; that is not authenticated price/timestamp data and may misidentify candles. Visual check can be UNVERIFIED. Do not interpret pixel-matched outcomes as a promise of a winning trade.

PUBLISH ON GITHUB PAGES
1. Extract this ZIP and upload THESE FIVE files to the ROOT of the GitHub repository: index.html, learning-v3.js, icon.svg, manifest.webmanifest, service-worker.js (five files total).
2. In GitHub Settings > Pages: Deploy from a branch, main, / (root). Make sure your latest github-pages deployment is green.
3. Your HTTPS page will generally follow https://USERNAME.github.io/REPOSITORY/ — substitute your exact repository name; do not guess.
4. Open app in desktop Chrome or Brave over HTTPS and keep it visible in a SEPARATE window alongside your Binomo 1m Crypto IDX tab. A separate tab in a minimized/background window can be throttled.
5. Choose Start Live Tab Monitor. In the Chrome share dialog choose the Binomo tab, select Share.
6. Drag within preview to select ONLY candle/chart plot (exclude buttons, balances, text, account area). Zoom out to expose >=25 distinguishable candles.
7. Confirm 'Binomo Crypto IDX · 1m' AND 'chart 1m candle clock matches India device clock' only after you actually verify them.
8. Leave 'Auto-save demo research' checked. Wait for the decision to be frozen near the end of the minute. Look at automatic tracker after that target candle closes + verification delay. No auto orders are placed.
9. At end of session export Backup all JSON, so research data survives browser storage cleanup. Restore JSON if needed.
10. For an actual Binomo DEMO trade result, use the optional 'Confirm WIN / LOSS / TIE' select for manual review. The auto-results alone cannot know broker entry price/settlement.

PHONE LIMITATION
On iPhone Chrome the dashboard and static screenshot analyses may open, but reliable continuous capture of another Binomo tab is not supported by this browser workflow. Auto result tracking requires supported desktop Chrome/Brave tab sharing. Uploading screenshots does NOT enable automatic live WIN/LOSS.

PRIVACY AND TERMS
- No Binomo login, clicking order buttons, trade execution, paid AI service, Binance proxy data, or collecting passwords.
- Use this for chart research / offline demo practice only. Binomo warns against using bots/AI/specialized software to trade; check their applicable terms.
- No data is uploaded to a server. Data lives in the browser's IndexedDB and can be cleared by browser privacy settings; export regularly.
- If chart colors or positioning change, reset crop and do not trust previous performance. If video freezes, leaves foreground, or screen share stops, outcome can be UNVERIFIED.

Official references:
https://helpcenter.binomo5.com/hc/en-us/articles/360047328013-What-does-a-Crypto-IDX-asset-mean
https://helpcenter.binomo5.com/hc/en-us/articles/360048637933--Can-I-use-bots-for-trading
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
