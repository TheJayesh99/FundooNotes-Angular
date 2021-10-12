import { label } from "./label.model";

export interface Notes {
    id:number;
    title:string ;
    description:string;
    label:label[];
    collaborators:string[];
}

