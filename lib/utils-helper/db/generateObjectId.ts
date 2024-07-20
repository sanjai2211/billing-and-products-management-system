import { ObjectId } from 'bson';

export const generateObjectId = () => {
    const objectId = new ObjectId();
    return objectId.toString();
}