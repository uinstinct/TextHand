import PouchDB from 'pouchdb';

function getDocRev(db) {
    const rev = db.get('doc-id-1')
        // eslint-disable-next-line no-underscore-dangle
        .then((resp) => (resp._rev ? resp._rev : null))
        .catch(() => null);
    return rev;
}

export async function saveFont(data) {
    const db = new PouchDB('font-file');
    const rev = await getDocRev(db);
    db.putAttachment('doc-id-1', 'attachment-id-1', rev, data, 'font/ttf')
        .then((resp) => (!!resp.ok))
        .catch(() => false)
        .finally(() => db.close());
}

export async function loadFont() {
    const db = new PouchDB('font-file');
    const rev = await getDocRev(db);
    try {
        if (rev) {
            return db.getAttachment('doc-id-1', 'attachment-id-1')
                .then((blob) => blob)
                .catch(() => null);
        }
        return null;
    } finally {
        db.close();
    }
}

export async function deleteFont() {
    const db = new PouchDB('font-file');
    const rev = await getDocRev(db);

    return db.removeAttachment('doc-id-1', 'attachment-id-1', rev)
        .then((resp) => (!!resp.ok))
        .catch(() => false)
        .finally(() => db.close());
}

export function destroyDB() {
    const db = new PouchDB('font-file');
    db.destroy()
        .finally(() => db.close());
}