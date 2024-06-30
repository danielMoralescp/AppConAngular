export class Token {
    private _key: string;
    private _idAuthor: string;

    constructor(key: string, idAuthor: string) {
        this._key = key;
        this._idAuthor = idAuthor;
    }

    get key(): string {
        return this._key;
    }

    get idAuthor(): string {
        return this._idAuthor;
    }

    set key(key: string) {
        this._key = key;
    }

    set idAuthor(idAuthor: string) {
        this._idAuthor = idAuthor;
    }
}
