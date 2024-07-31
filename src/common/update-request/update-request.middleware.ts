import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { uid } from 'uid';

@Injectable()
export class UpdateRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.method === 'POST') {
      req.body.name = req.body.name.trim() === ""? uid(16): req.body.name;
      req.body.description = req.body.description.trim() === "" ? uid(16): req.body.description; 
    }
    next();
  }
}
