import Api from './Api';
import SqlService from '../Common/SqlService';

const Constants = {
    ...Api,
    siteUrl: "http://sozluk.gov.tr/",
    logo: "konum",
    SqlService: SqlService,
};

export default Constants;
