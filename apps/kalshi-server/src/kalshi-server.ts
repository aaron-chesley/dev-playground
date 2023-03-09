import * as WebSocket from 'ws';
import * as http from 'http';
import * as puppeteer from 'puppeteer';

export class KalshiServer {
  private server: http.Server;
  private wss: WebSocket.Server;
  private browser: puppeteer.Browser;
  private page: puppeteer.Page;
  private scrapingInterval: ReturnType<typeof setInterval>;
  private readonly KALSHI_HOMEPAGE = 'https://kalshi.com';
  private readonly KALSHI_MARKET_URL = `https://trading-api.kalshi.com/v1/events/INXW-23MAR10`;

  constructor(port: number) {
    this.server = http.createServer();
    this.wss = new WebSocket.Server({ server: this.server });
    this.server.listen(port, () => {
      console.log('WebSocket server listening on port', port);
    });

    this.startScraping();
  }

  private async startScraping() {
    this.cleanupScraper();
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    await this.page.goto(this.KALSHI_HOMEPAGE, { waitUntil: 'networkidle2' });
    this.scrapingInterval = setInterval(() => {
      this.page
        .evaluate(
          (url) => fetch(url).then((response) => response.json()),
          this.KALSHI_MARKET_URL
        )
        .then((response) => {
          this.broadcast(
            JSON.stringify({
              messageType: '[Kalshi Api] Market Data Update',
              payload: response,
            })
          );
        });
    }, 5000);
  }

  private broadcast(message: string) {
    this.wss.clients.forEach((client) => {
      client.send(message);
    });
  }

  private async cleanupScraper() {
    if (this.scrapingInterval) {
      clearInterval(this.scrapingInterval);
    }
    if (this.page) {
      await this.page.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }

  private close() {
    this.wss.close();
    this.server.close();
  }
}
