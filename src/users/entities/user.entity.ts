import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    uniqueId: string;
    
    @Prop()
    login: string;

    @Prop()
    password: string;

    @Prop()
    description: string;

    @Prop()
    role: string[];
}
