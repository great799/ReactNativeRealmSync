import {ObjectId} from 'bson';
const NoteSchema = {
    name: 'Note',
    properties: {
        _id: 'objectId',
        _userId: 'string', // should be userId or add any static for test project.
        date: 'int',
        noteName: 'string'
    },
    primaryKey: '_id',
};

export default NoteSchema;