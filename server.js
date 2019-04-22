const Nightmare = require('nightmare')
const cheerio = require('cheerio');
const nightmare = Nightmare({ show: false })
var axios = require("axios");
var moment = require('moment');




let pieces = []

const getRating = () => {
    nightmare
        .goto('https://www.aliexpress.com/item/Ugreen-HDMI-male-to-HDMI-female-cable-adapter-converter-extender-90-degree-angle-270-degree-angle/32403914176.html?spm=2114.search0604.3.10.76567fadVAYRtN&ws_ab_test=searchweb0_0,searchweb201602_4_10065_10130_10068_10890_10547_319_10546_317_10548_10545_10696_453_10084_454_10083_10618_10307_537_536_10059_10884_10887_321_322_10103,searchweb201603_80,ppcSwitch_0&algo_expid=a3625668-6e03-4cf0-9e4e-eaf04a5a73e2-1&algo_pvid=a3625668-6e03-4cf0-9e4e-eaf04a5a73e2&transAbTest=ae803_4')
        .evaluate(() => document.querySelector('.percent-num').innerText)
        .end()
        .then(console.log)
        .catch(error => {
            console.error('Search failed:', error)
        })
}

// getRating()

const getDetails= () =>{
    let page = 1;
    let CurrentDate = moment().utc().format('D');





    axios.get(`https://feedback.aliexpress.com/display/evaluationProductDetailAjaxService.htm?callback=jQuery18309305320967874013_1555893591847&productId=32792771121&type=default&page=${page}&_=1555893598320`)
        .then(function (response) {
            var myObj = JSON.parse(response.data.replace(/[()]/g, '').replace('jQuery18309305320967874013_1555893591847', '').replace(';', ''));
            myObj.records.forEach(arrayItem => {
                console.log(arrayItem.date.split(" ")[0] );
            });        })
        .catch(function (error) {
            console.log(error);
        });



    // console.log( moment('21 Apr 2019 09:42', 'YYYY-MMM-D').isValid());
    console.log(CurrentDate)

}
getDetails()






