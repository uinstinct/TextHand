import PouchDB from 'pouchdb';

const db = new PouchDB("preferences");

export function dbExists() {
    db.info()
        .then(res => {
            return res.doc_count > 0 ? true : false;
        })
        .catch(err => {
            return false;
        });
}