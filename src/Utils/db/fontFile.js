import PouchDB from "pouchdb";

const db = new PouchDB("font-file");

export async function saveFont(data) {

    //db.getAttachment("doc")

    const doc = {
        "_id": "font-family-id",
        "title": "FontFamily",
        "_attachments": {
            "font-file-id": {
                "content_type": "font/ttf",
                "data": data
            }
        }
    };

    db.put(doc)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
}

export async function loadFont() {
    return db.getAttachment("font-family-id", "font-file-id")
        .then(blob => {
            return blob;
        })
        .catch(err => console.log(err));
}