const express = require('express');
const router = express.Router();
const cors = require('cors');

const fileUpload = require('./upload-file/upload-file');
const chartsetData = require('./chartsetdata/chartsetdata');
const metaData = require('./metadata/get-metadata');

const apiRoute = '/1.0.1';

// Routings
router.use(cors());

router.get(`${apiRoute}/getchartsetdata`, chartsetData.getChartSetData);
router.get(`${apiRoute}/getmetadata`, metaData.getMetaData);
router.get(`${apiRoute}/getchartsetitem`, chartsetData.getchartsetItem);

router.put(`${apiRoute}/updatecountryItem`, metaData.updateCountryItem);








router.post(`${apiRoute}/uploadfile`, fileUpload.deleteDbUpload, fileUpload.uploadFile);















router.post(`${apiRoute}/deleteallentries`, fileUpload.deleteEntriesDb);

router.get('/', (req, res, next) => {
    res.send('test geht');
})



// router.get(`${apiRoute}/getusers`, user.getUsers);

// router.put(`${apiRoute}/updateuser`, user.put);

// router.post(`${apiRoute}/isauth`, loginView.isAuth);



module.exports = router;