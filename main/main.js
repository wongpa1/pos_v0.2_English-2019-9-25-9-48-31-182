'use strict';

function printReceipt(inputs) {
  var countBarcode = BarcodeCount(inputs);
  var itemDetails = mapItem(countBarcode);
  var Receipt = printItem(itemDetails);
  console.log(Receipt);
  //console.log(itemDetails);
}

function BarcodeCount(Barcodes){
  
  let countedCodeObject = Barcodes.reduce(function (allBarcode, code) {
    if (code in allBarcode) {
      allBarcode[code]++;
    }
    else {
      allBarcode[code] = 1;
    }
    return allBarcode;
  }, {})

 // let countedCode = [];
 // countedCode = Object.keys(countedCodeObject).map(function(code) {
 //   return {code : countedCodeObject[code]};
 // });
  return countedCodeObject;
}

function mapItem(countBarcode){
  let allItemlist = loadAllItems();
  let itemList = allItemlist.filter( item => Object.keys(countBarcode).includes(item.barcode));

  itemList.forEach(item => {
    let unit = item.unit; 
    if (countBarcode[item.barcode] > 1){
      unit += 's';
    }

    item['Quantity']=countBarcode[item.barcode] +' '+unit;
    item['Subtotal']=(item.price * countBarcode[item.barcode]);
  });
  return itemList;
}

function printItem(itemDetails){
  var total = totalPrice(itemDetails);
  var ReceiptString = formatting(itemDetails,total);
  return ReceiptString;
}

function totalPrice(itemDetails){
  let Totalprice = 0;
  itemDetails.forEach(item =>{
    Totalprice += item.Subtotal;
  });
  return Totalprice;
}

function formatting(itemDetails,Totalprice){
  var result = '***<store earning no money>Receipt ***\n';
  itemDetails.forEach( item => {
    result += 'Name: '+ item.name +', Quantity: '+item.Quantity+', Unit price: '+item.price.toFixed(2)+' (yuan), Subtotal: '+item.Subtotal.toFixed(2)+' (yuan)\n';
  })
  result += '----------------------\n'+'Total: '+Totalprice.toFixed(2)+' (yuan)\n'+'**********************';

  return result;
}