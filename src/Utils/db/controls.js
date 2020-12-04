import PouchDB from 'pouchdb';

function destroyDB() {
    const db = new PouchDB('controls');
    return db.destroy();
}

export async function writeControls(controls) {
    await destroyDB();

    console.log(controls, 'are received');
    const db = new PouchDB('controls');
    const controlsArray = Object.entries(controls);

    const writeArray = controlsArray
        .filter(([key]) => key !== 'fontFamily')
        .map(([key, value]) => ({
            _id: key,
            name: key,
            curVal: value,
        }));

    db.bulkDocs(writeArray)
        .finally(() => db.close());
}

/* lazyInit in useReducer cannot be an async function
 * we have to await for db action to complete
 * to return the docs from the db */
export async function fetchControls() {
    const db = new PouchDB('controls');
    const docs = await db
        .allDocs({ include_docs: true, })
        .then((res) => res.rows)
        .then((rows) => rows.map((row) => row.doc))
        .catch((err) => console.log(err, 'when fetching the controls'))
        .finally(() => db.close());

    return docs;
}