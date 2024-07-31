import { Injectable, NestMiddleware } from '@nestjs/common';
import { uid } from 'uid';

@Injectable()
export class UserRequestMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if(req.method === 'POST') {
      req.body.uniqueId = uid(16);
    }
    next();
  }
}
