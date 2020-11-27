import PouchDB from 'pouchdb';

const db = new PouchDB('font-file');

function getDocRev() {
    const rev = db.get('doc-id-1')
        // eslint-disable-next-line
        .then((resp) => (resp._rev ? resp._rev : null))
        .catch(() => null);
    return rev;
}

export async function saveFont(data) {
    const rev = await getDocRev();

    db.putAttachment('doc-id-1', 'attachment-id-1', rev, data, 'font/ttf')
        .then((resp) => (!!resp.ok))
        .catch(() => false);
}

export async function loadFont() {
    const rev = await getDocRev();
    if (rev) {
        return db.getAttachment('doc-id-1', 'attachment-id-1')
            .then((blob) => blob)
            .catch((err) => console.log(err));
    }
    return null;
}

export function deleteFont() {
    return db.remove('doc-id-1')
        .then((resp) => (!!resp.ok))
        .catch(() => false);
}

export function destroyDB() {
    db.destroy()
        .then((resp) => {
            console.log(resp);
        })
        .catch(() => console.info('db was not destroyed'));
}