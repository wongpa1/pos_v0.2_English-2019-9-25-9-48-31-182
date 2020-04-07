'use strict';

function printReceipt(inputs){
  var countBarcode = BarcodeCount(inputs);
  var itemDetails = mapItem(countBarcode);
  var receipt = printItem(itemDetails);
  console.log(receipt);
}

function BarcodeCount(barcodes){
  let countedCodeObject = barcodes.reduce(function (allBarcode, code) {
    if (code in allBarcode) {
      allBarcode[code]++;
    }
    else {
      allBarcode[code] = 1;
    }
    return allBarcode;
  }, {})
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
  var receiptString = formatting(itemDetails,total);
  return receiptString;
}

function totalPrice(itemDetails){
  let totalprice = 0;
  itemDetails.forEach(item =>{
    totalprice += item.Subtotal;
  });
  return totalprice;
}

function formatting(itemDetails,totalprice){
  const decimalTo2 = 2;
  var result = '***<store earning no money>Receipt ***\n';
  itemDetails.forEach( item => {
    result += 'Name: '+ item.name +', Quantity: '+item.Quantity+', Unit price: '+item.price.toFixed(decimalTo2)+' (yuan), Subtotal: '+item.Subtotal.toFixed(decimalTo2)+' (yuan)\n';
  })
  result += '----------------------\n'+'Total: '+totalprice.toFixed(decimalTo2)+' (yuan)\n'+'**********************';

  return result;
}