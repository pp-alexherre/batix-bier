const chartsetModel = require('../../_models/beer');

exports.getChartSetData = async(req, res) => {
    try {
        chartsetModel.findAll().then(chartsetItems => {
            _filterChartsetData(chartsetItems, res);
        })

    } catch (err) { console.log(`Error Get Beer Data --> ${err}`) }
}

exports.getchartsetItem = async(req, res) => {

    console.log('anfrage gestartet')

    try {
        chartsetModel.findAll({
            where: {
                group_id: req.headers.groupid
            }
        }).then(resItems => {
            _filterChartsetData(resItems, res);
        })
    } catch (err) { console.log('Error GetChartsetItem --> ', err) }
}

let country = '';
let cacheCountry = [];
const _filterChartsetData = async(itemsArray, res) => {

    console.log('--> FilterDataChartsetData gestartet <-- ');

    let cacheArrayItems = [];
    let dataItemsArray = [];
    let cacheItem = {
        data: [],
        label: undefined,
        borderColor: undefined,
        fill: false
    }
    let internIndex = 0;
    for (let i = 0; i < itemsArray.length; i++) {
        let randomHex = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        country = itemsArray[i]['country'];
        if (itemsArray[i]['country'].indexOf(country) !== -1) {
            cacheCountry.push(itemsArray[i].country);
            if (itemsArray[i]['status']) {
                if (internIndex < 9) {
                    dataItemsArray.push(itemsArray[i].flaschen);
                    internIndex = internIndex + 1;
                    if (internIndex === parseInt(9)) {
                        cacheItem = {
                            data: dataItemsArray,
                            label: itemsArray[i].country,
                            borderColor: randomHex,
                            backgroundColor: randomHex,
                            fill: false
                        }
                        cacheArrayItems.push(cacheItem);
                        dataItemsArray = [];
                        internIndex = 0;
                    }
                }
            }
        }
    }
    res.status(200).json(cacheArrayItems);
}