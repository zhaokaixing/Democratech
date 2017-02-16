import {Physic} from "./Physic";
import {TagCategory} from "./TagCategory";
/**
 * Created by quentinC on 16/02/2017.
 */
export class Tag{
    label : string;
    listPersonPhysic : Array<Physic>;
    tagCategory : TagCategory;
}