const config = {
    url: process.env.REACT_APP_BASE_URL,
    port: process.env.REACT_APP_PORT
}

export class Api {
    constructor(config) {
        this.config = config;
    }
    createObj(text) {
        return fetch(`${this.config.url}${this.config.port}/api/inputobjects`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(text)
        })
    }
    getData({codeFilter, valueFilter, sortColumn, sortOrder, page, pageSize}) {
        return fetch(`${this.config.url}${this.config.port}/api/inputobjects?${pageSize ? `pageSize=${pageSize}&` : ''}${codeFilter ? `codeFilter=${codeFilter}&` : ''}${valueFilter ? `valueFilter=${valueFilter}&` : ''}${sortColumn ? `sortColumn=${sortColumn}&` : ''}${sortOrder ? `sortOrder=${sortOrder}&` : ''}${page ? `page=${page}` : ''}`)
        .then(res => {return this._checkResponse(res)})
    }
    _checkResponse(res) {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      }
}

export const api = new Api(config);