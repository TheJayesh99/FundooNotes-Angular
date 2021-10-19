import { label } from "./label.model";

export interface Notes {
    id:number;
    title:string ;
    description:string;
    label:label[];
    collaborators:string[];
    is_archive:boolean
    is_binned:boolean
}

