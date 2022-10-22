class Api {
    constructor() {
        this.baseUrl = 'https://api.ginko.voyage/'
        this.apiKey = '81ebb234472e287f2154b8cad39e0076'
    }

    get(action, params = {}) {
        let paramString = ''
        if (!Object.entries(params).keys().length) {
            Object.entries(params).forEach(([key, val]) => {
                console.log(key, val)
                paramString += `&${key}=${val}`
            })
        }
        const url = this.baseUrl+action+'.do?apiKey='+this.apiKey+paramString

        return $.ajax({
            url: url
        })
    }

    drGetLines() {
        return this.get('DR/getLignes', )
    }

    drGetLine(idVariante) {
        return this.get('DR/getDetailsVariante', {idVariante:idVariante})
    }

    trGetTempsLieu(nom) {
        return this.get('TR/getTempsLieu', {nom:nom})
    }

    trGetDetailsVehicule(numBus) {
        return this.get('TR/getDetailsVehicule', {num:numBus})
    }

}

export default Api