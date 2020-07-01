import RNFetchBlob from 'rn-fetch-blob';

export default {
    siteUrl: "http://sozluk.gov.tr/",
    get: function (value) {
        return new Promise((resolve, reject) => {
            RNFetchBlob.fetch('GET', value)
                .then((res) => {
                    resolve(JSON.parse(res.data))
                }).catch((errorMessage, statusCode) => reject(errorMessage, statusCode))
        })
    },
    sQuery: function (value) {
        return new Promise(async (resolve, reject) => {
            this.get(this.siteUrl + "yazim?ara=" + value)
                .then(content => resolve(content))
                .catch(error => reject(error))
        })
    },
}
