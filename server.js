const Nightmare = require('nightmare')
const cheerio = require('cheerio');
const nightmare = Nightmare({show: false})
var axios = require("axios");
var moment = require('moment');
let bodyParser = require(`body-parser`);
var express = require(`express`)
var cors = require(`cors`)
var emojiFlags = require('emoji-flags');

var app = express()
app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("client/build"));


let pieces = []
let productid
let total_sales = []
let country = []
let body = {
    sales: [],
    country: [],
    emoji: [],
    rating: "",
    totalOrders:""
}
let willreturn = true
let page = 1;
let CurrentDate = moment().utc().format('D');
let sameDate = true
let dataComplete = false


const getRating = async (url) => {

    await axios.get(url).then(response => {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);
         body.rating = $('.percent-num').text();
         body.totalOrders = $('#j-order-num').text();
    })        .catch(error => {
        console.error('Search failed:', error)
    })
    return body

}


app.post('/api/productdetails', async (req, res) => {
   await getdata(req.body.url)
       .then(data =>{
           if (data == ""){
               throw new Error
           }
           body = {
               sales: [],
               country: [],
               rating: ""}
           res.send(data)})
       .then(body => {body = {
           sales: [],
           country: [],
           rating: ""
       }
       })
       .catch(err =>{
       res.status(404).send(err)
   })
})
const getdata = async (url) => {
     productid = await getProjectID(url)
    let data = await getRating(url)
          data = await getproductDetails()
    return data

}


const getProjectID = async url => {
    let id
    id = await url.split(".html")[0].split("/").pop()
    return id
}

const getproductDetails = async () => {

    let response = await axios.get(`https://feedback.aliexpress.com/display/evaluationProductDetailAjaxService.htm?callback=jQuery18309305320967874013_1555893591847&productId=${productid}&type=default&page=${page}&_=1555893598320`)
        .then(function (response) {
            var myObj = JSON.parse(response.data.replace(/[()]/g, '').replace('jQuery18309305320967874013_1555893591847', '').replace(';', ''));
            myObj.records.forEach(arrayItem => {
                if (parseInt(arrayItem.date.split(" ")[0]) == parseInt(CurrentDate)) {
                    body.sales.push(parseInt(arrayItem.quantity))
                    body.country.push(emojiFlags.countryCode(arrayItem.countryCode))
                    body.emoji.push(emojiFlags.countryCode(arrayItem.countryCode).emoji)
                }
                if (!(parseInt(arrayItem.date.split(" ")[0]) == parseInt(CurrentDate))) {
                    sameDate = false
                    willreturn = true
                    console.log("hey")
                }


            })
            if (sameDate) {
                page++
                willreturn = false
                getproductDetails()
            }
            if (willreturn) {
                return body
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    return response

}




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});


