const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrKey: "dims" });

const beerModel = require('./../../_models/beer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/upload');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
let upload = multer({ storage: storage }).single('file');
let RESPONSE;

exports.uploadFile = async(req, res, next) => {


    RESPONSE = res;

    // _readCurrentFileXML(req.file.originalname)

    upload(req, res, (err) => {
        if (err) {
            return res.status(501).json({ error: err });
        }
        console.log('FileUpload gestartet --> ', req.file.mimetype);
        // req.file.mimetype == 'text/xml' ? (
        //     _deleteDb(req, res),
        _readCurrentFileXML(req.file.originalname, res, next)

        // ) : (
        //     res.status(200).json({ statustext: `Dateiformat "${req.file.mimetype}" nicht korrekt ! Bierberechnung nicht möglich`, currentformat: req.file.mimetype })
        // );
    })
}

// const _deleteDb = async(req, res) => {
//     await beerModel.destroy({
//         where: {},
//         truncate: true
//     })
//     await _readCurrentFileXML(req.file.originalname)
//     await res.status(200).json({ statustext: 'Bier-Daten gespeichert und werden verarbeitet ! Prost !!', originalname: req.file.originalname })
// }

exports.deleteDbUpload = async(req, res, next) => {

    console.log('_deleteDb gestartet 1 --> ');
    try {
        upload(req, res, (err) => {
            console.log('_deleteDb gestartet 2 --> ', req.file);
            req.file.mimetype == 'text/xml' ? (
                beerModel.destroy({
                    where: {},
                    truncate: true
                }),
                next()
            ) : (
                res.setHeader('Content-Type', 'text/plain'),
                res.status(200).json({ statustext: `Dateiformat "${req.file.mimetype}" nicht korrekt ! Bierberechnung nicht möglich`, currentformat: req.file.mimetype })
            )
        })
    } catch (err) { console.log('error deleteUpload --> ', err) }





    // req.file.mimetype == 'text/xml' ? (
    //     await beerModel.destroy({
    //         where: {},
    //         truncate: true
    //     }).then(
    //         next()
    //     )
    // ) : (
    //     res.status(200).json({ statustext: `Dateiformat "${req.file.mimetype}" nicht korrekt ! Bierberechnung nicht möglich`, currentformat: req.file.mimetype })
    // );

}

exports.deleteEntriesDb = async(req, res) => {
    beerModel.destroy({
        where: {},
        truncate: true
    }).then(
        res.status(200).json({ message: 'alles gelöscht!', status: true })
    ).then(
        setTimeout(() => {
            console.log('----> Server wird neu gestartet <-----')
            process.exit(1);
        }, 5000)
    )
}

// Daten aus der hochgeladenen Datei lesen
const _readCurrentFileXML = async(filename, res, next) => {

    console.log('_readCurrentFile gestartet')

    let filePath = path.join(__dirname, '/../../assets/upload/' + filename);
    let __readFile = fs.readFileSync(filePath);
    parser.parseString(__readFile, (error, result) => {
        if (error === null) {
            result.Data ? _filterCurrentFile(result.Data.Fact, res, filename, next) : console.error('Error Parse Data');
        } else {
            console.log(`_readFile Error --> `, error);
        }
    })
}

// Nach den Bier Objeken filtern und übergeben
let INDEX = 0;
dataItemArray = [];
const _filterCurrentFile = async(dataArray, res, name, next) => {

    // console.log('_filterCurrentFile dataArray --> ', dataArray)


    dataArray.forEach(async dataItem => {
        // if (dataItem.COUNTRY == 'Germany' || dataItem.COUNTRY == 'Austria' || dataItem.COUNTRY == 'Switzerland') {
        if (dataItem.ALCOHOLTYPE == 'Beer') {
            dataItemArray.push(dataItem)
            console.log('_filterCurrentFile gestartet dataItemArray --> ', dataItemArray.length)
                // console.log('_filterCurrentFile gestartet --> dataItem', dataItem.length)
            INDEX++;
            console.log('_filterCurrentFile INDEX --> ', INDEX)
        }
        // }
    })
    _writeCurrentFileToDatabase(dataItemArray, name, INDEX, res, next);
}
let groupID = 0;
let cacheCountry = 'init';

let INDEX2 = 0;
// gefilterte Daten in die Databank schreiben
const _writeCurrentFileToDatabase = async(dataItemArray, name, index, res, next) => {

    console.log('_writeCurrentFileToDatabase gestartet')

    dataItemArray.forEach(dataItem => {


        const flasche = Math.round(dataItem.Display * 40);

        if (cacheCountry !== `${dataItem.COUNTRY}`) {
            cacheCountry = `${dataItem.COUNTRY}`;
            groupID = groupID + 1;
        }
        const statusCountry = dataItem.COUNTRY == 'Germany' || dataItem.COUNTRY == 'Switzerland' || dataItem.COUNTRY == 'Austria' ? true : false;
        try {
            console.log('index --> ', index);
            beerModel.create({
                country: dataItem.COUNTRY,
                flaschen: flasche,
                group_id: groupID,
                year: dataItem.YEAR,
                liter: dataItem.Display,
                status: statusCountry
            }).then(() => {
                INDEX2++;
                console.log('index ---> ', index);
                console.log('INDEX 2 ---> ', INDEX2);
                if (INDEX2 >= index) {
                    console.log('fertig  ----------------- > ')
                    res.status(200).json({ statustext: 'Bier-Daten gespeichert und werden verarbeitet ! Prost !!', originalname: name })
                    setTimeout(() => {
                        process.exit(1);
                    }, 5000)
                }
            })

        } catch (err) { console.error(`Error Write Database --> ${err}`) };
    })
    console.log('fertig  ----------------- > ', INDEX2)
    console.log('fertig  ----------------- > ', dataItemArray.length)
}

exports.sendResponse = async(req, res) => {
    console.log('fertig  ----------------- > ')
    setTimeout(() => {
        res.status(200).json({ statustext: 'Bier-Daten gespeichert und werden verarbeitet ! Prost !!', originalname: name })
    }, 15000)

}