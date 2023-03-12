/*
    1.  Let's import the easyinvoice library so we can use it.
    2.  Let's import the built-in NodeJS fs library,
        so we can interact with the file system to save our invoice 
*/
var easyinvoice = require('easyinvoice');
var fs = require('fs');

/*  
    3.  Let's create a data object. 
        This object will contain all the data we would like to be visible on our invoice.
        We will add data later in our demo.
*/

const writeInvoice = (result) => {
  fs.writeFileSync('invoice.pdf', result.pdf, 'base64');
};
const generateInvoice = (data) => {
  easyinvoice.createInvoice(data, writeInvoice);
};
module.exports = { generateInvoice };
