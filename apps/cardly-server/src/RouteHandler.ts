import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { randomId } from '@playground/shared/util/id';

const secretKey = 'myCoolSecretKey';

export class RouteHandlers {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.addUserToRequestMiddleware);
  }

  private setupRoutes(): void {
    this.app.post('/api/generate-token', this.generateTokenHandler);
    this.app.post('/api/me', this.meHandler);
    this.app.post('/api/logout', this.logoutHandler);
  }

  private generateTokenHandler = (req: Request<{}, {}, { displayName: string }>, res: Response): void => {
    if (req.cookies?.token) {
      try {
        const user = jwt.verify(req.cookies.token, secretKey);
        res.send({ user });
        return;
      } catch (err) {}
    }

    const displayName = req.body?.displayName;
    if (!displayName) {
      res.sendStatus(400);
      return;
    }

    const user = { id: randomId(), displayName, avatar: '/assets/avatars/anonymous.svg' };

    const token = jwt.sign({ user }, secretKey);

    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 * 10 });

    res.send({ token });
  };

  private meHandler = (req: Request, res: Response): void => {
    if (!req.cookies?.token) {
      res.send(null);
      return;
    }

    try {
      const payload = jwt.verify(req.cookies.token, secretKey);
      res.send(payload['user']);
    } catch (err) {
      res.send(null);
    }
  };

  private logoutHandler = (req: Request, res: Response): void => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  };

  private addUserToRequestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const cookie = req.cookies?.token;

    if (!cookie) {
      req['user'] = null;
      next();
      return;
    }

    try {
      const payload = jwt.verify(cookie, secretKey);
      req['user'] = payload['user'];
      next();
    } catch (err) {
      req['user'] = null;
      next();
    }
  };
}

export default RouteHandlers;
