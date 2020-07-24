const countryModel = require('../../_models/beer');

exports.getMetaData = async(req, res) => {
    try {
        countryModel.findAll().then(chartItems => {
            _filterMetaData(chartItems, res);
        })
    } catch (err) { console.error(`Error Get Countries --> ${err}`) }
}

const _filterMetaData = (itemsArray, res) => {

    console.log('--> FilterData Meatadaten gestartet <-- ');

    let cacheArrayCountry = [];
    let cacheArrayCountries = [];
    let cacheArrayYear = [];
    let cacheArrayGroupID = [];
    let cacheArray = {
        countries: [],
        years: [],
    }
    itemsArray.forEach(metaItem => {
        if (!cacheArrayGroupID.includes(metaItem.group_id)) {
            cacheArrayGroupID.push(metaItem.group_id)
        }
        if (!cacheArrayCountries.includes(metaItem.country)) {
            currentObj = {
                country: metaItem.country,
                group_id: metaItem.group_id,
                status: metaItem.status
            }
            cacheArrayCountry.push(currentObj);
            cacheArrayCountries.push(metaItem.country);
        }
        if (!cacheArrayYear.includes(metaItem.year)) {
            cacheArrayYear.push(metaItem.year)
        }
    })
    cacheArray.countries = cacheArrayCountry
    cacheArray.years = cacheArrayYear
    res.status(200).json(cacheArray);
}

exports.updateCountryItem = async(req, res) => {

    console.log('Anfrage Client Update Country Item Header --> ');

    try {
        countryModel.findAll({
            where: {
                group_id: req.body.group_id
            }
        }).then(groupItems => {
            let cacheArray = [];
            groupItems.forEach(groupItem => {
                groupItem.status = !req.body.status;
                countryModel.update({
                    status: groupItem.status
                }, {
                    where: {
                        group_id: groupItem.group_id
                    }
                })
                cacheArray.push(groupItem);
            })
            res.status(200).json(cacheArray[0]);

        }).catch(err => { console.log('Error UpdateCountryItem --> ', err) })
    } catch (err) { console.log(`Error Update Country Item -->  ${err}`) }
}