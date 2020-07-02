import RNFetchBlob from 'rn-fetch-blob';

export default {
    siteUrl: "http://sozluk.gov.tr/",
    siteUrl2: "http://api.iamtortue.com/sozluk/",
    get: function (value) {
        return new Promise((resolve, reject) => {
            RNFetchBlob.fetch('GET', value)
                .then((res) => {
                    resolve(JSON.parse(res.data))
                }).catch((errorMessage, statusCode) => reject(errorMessage, statusCode))
        })
    },
    post: function (uri, params) {
        return new Promise((resolve, reject) => {
            RNFetchBlob.fetch('POST', uri, {
                'Content-Type': 'application/json'
            }, JSON.stringify(params))
                .then((res) => {
                    resolve(JSON.parse(res.data))
                }).catch((errorMessage, statusCode) => reject(errorMessage, statusCode))
        })
    },
    nQuery: function (value) {
        return new Promise(async (resolve, reject) => {
            this.get(this.siteUrl + "adlar?ara=" + value)
                .then(content => resolve(content))
                .catch(error => reject(error))
        })
    },
    wQuery: function (value) {
        return new Promise(async (resolve, reject) => {
            this.get(this.siteUrl + "yazim?ara=" + value)
                .then(content => resolve(content))
                .catch(error => reject(error))
        })
    },
    wMQuery: function (value) {
        return new Promise(async (resolve, reject) => {
            this.post(this.siteUrl2 + "getMeaning.php", value)
                .then(content => resolve(content))
                .catch(error => reject(error))
        })
    },
}
