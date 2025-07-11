/**
 * @properties={"type":12,"typeid":36,"uuid":"8D28CA37-8150-4AF6-8B6E-3A004F856C3B"}
 */
function displayAddress()
{
	return [
		shipaddress,
		shipcity,
		shipcountry + ' ' + shippostalcode
	].join('\n')
}

/**
 * Returns the calculated total of the order all items + freight
 * @properties={"type":8,"typeid":36,"uuid":"D4BA139C-3E72-48D1-BDD4-ADA10D44F3BE"}
 */
function order_total()
{
	var total = 0;
	for (var i = 1; i <= orders_to_order_details.getSize(); i++) {
		var record = orders_to_order_details.getRecord(i);
		total += record.subtotal;
	}
	return total + freight;
}
