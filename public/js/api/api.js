class Api {
    constructor() {
        this.baseUrl = 'https://api.ginko.voyage/'
        this.apiKey = '014ec2ea02294910a215613548b82015'
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