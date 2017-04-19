customProperties:"formComponent:false",
dataSource:"db:/example_data/orders",
encapsulation:60,
items:[
{
labelFor:"employeeid",
location:"20,110",
name:"employeeid_label",
size:"190,20",
text:"Sales Rep",
transparent:true,
typeid:7,
uuid:"045EC696-28F9-4A89-B953-1F1AD8CC31F5"
},
{
anchors:11,
displaysTags:true,
location:"20,0",
size:"590,30",
styleClass:"label_header_1",
text:"Order Info",
typeid:7,
uuid:"14B4482F-DA4C-47FF-B92A-7FC958FA1071"
},
{
labelFor:"shipvia",
location:"20,230",
name:"shipvia_label",
size:"190,20",
text:"Shipper",
transparent:true,
typeid:7,
uuid:"22B20C42-DCED-43C4-A0DC-78B0AC469C0C"
},
{
labelFor:"orderdate",
location:"20,170",
name:"orderdate_label",
size:"190,20",
text:"Ordered",
transparent:true,
typeid:7,
uuid:"34428F4F-C5CC-4FDF-8AC5-1D5F085648D0"
},
{
height:580,
partType:5,
typeid:19,
uuid:"43B33677-5096-458C-9300-B49C12AD3E10"
},
{
dataProviderID:"customerid",
location:"20,70",
name:"customerid",
size:"190,30",
text:"Customer",
typeid:4,
uuid:"4AC53E03-32CF-47DC-8A90-DC8B36ABA6E8",
valuelistID:"46AC7E83-19D0-40B1-B20D-D544218C7D56"
},
{
anchors:15,
items:[
{
containsFormID:"22B73395-C54B-4766-98F0-7816AE69A4AD",
location:"20,480",
relationName:"orders_to_order_details",
text:"orderItemsGrid",
typeid:15,
uuid:"3A2AC90C-6E08-4DB9-BCD9-E757BD0431D5"
}
],
location:"20,450",
name:"tabs",
printable:false,
size:"590,90",
transparent:true,
typeid:16,
uuid:"674C42B0-7FF0-47AD-A1C2-4E5DCEAE0570"
},
{
dataProviderID:"employeeid",
location:"20,130",
name:"employeeid",
size:"190,30",
text:"Sales Rep",
typeid:4,
uuid:"688E78C4-ECCB-4A79-9A91-48876A1EC62C",
valuelistID:"0B278E08-D559-4D27-B1F1-0A7DE73C4F9D"
},
{
anchors:6,
dataProviderID:"order_total",
displaysTags:true,
formIndex:1,
format:"¤#,###.00",
location:"490,540",
size:"120,30",
styleClass:"label_header_3",
text:"Total",
typeid:7,
uuid:"6A316629-D922-4464-8DD8-7AB7B7264BE3"
},
{
formIndex:1,
location:"180,130",
name:"navc",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"30,30",
styleClass:"font-icon",
text:"<span class=\"fa fa-external-link-square\"/>",
transparent:true,
typeid:7,
uuid:"6DE304BE-AFA9-4CAF-92D5-870BF82FA696"
},
{
labelFor:"customerid",
location:"20,50",
name:"customerid_label",
size:"190,20",
text:"Customer",
transparent:true,
typeid:7,
uuid:"A7EBE6C2-FB24-4553-A4F5-C598B4F47926"
},
{
location:"180,70",
name:"nav",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"30,30",
styleClass:"font-icon",
text:"<span class=\"fa fa-external-link-square\"/>",
transparent:true,
typeid:7,
uuid:"A8C31278-01DE-48E7-96FA-0FD2A139DD23"
},
{
formIndex:1,
location:"180,250",
name:"navcc",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"30,30",
styleClass:"font-icon",
text:"<span class=\"fa fa-external-link-square\"/>",
transparent:true,
typeid:7,
uuid:"A8FD032D-CF38-4598-B87D-6880D24F7D5A"
},
{
json:{
anchors:0,
backgroundColor:"backgroundColor",
foundset:{
dataproviders:{
backgroundColor:null,
borderColor:null,
borderWidth:null,
hoverBackgroundColor:null,
hoverBorderColor:null,
hoverBorderWidth:null,
label:"order_details_to_products.productname",
value:"subtotal"
},
foundsetSelector:"orders_to_order_details"
},
hoverBorderColor:"hoverBorderColor",
location:{
x:236,
y:45
},
onClick:"87FF09BC-CDBC-4742-A4EE-FBA5B0187CAD",
size:{
height:327,
width:374
},
type:"pie"
},
location:"236,45",
name:"chart",
size:"374,327",
typeName:"svychartjs-chart",
typeid:47,
uuid:"AE5575E9-0FB3-4D02-80C9-DD4E9F3D3F89"
},
{
dataProviderID:"orderdate",
displayType:5,
location:"20,190",
name:"orderdate",
size:"190,30",
text:"Ordered",
typeid:4,
uuid:"C37AE5C4-51F0-422A-BB07-1EEE28C5D814"
},
{
anchors:14,
displaysTags:true,
location:"20,540",
size:"590,30",
styleClass:"label_header_3",
text:"Order Total",
typeid:7,
uuid:"C4F853D5-0F18-465C-902F-F75D105A5490"
},
{
anchors:11,
displaysTags:true,
location:"20,410",
size:"590,30",
styleClass:"label_header_2",
text:"Order Items (%%orders_to_order_details.maxRecordIndex%%)",
typeid:7,
uuid:"D9137DA3-2C4F-4608-8FDF-5334718CE92F"
},
{
formIndex:1,
labelFor:"chartType",
location:"20,290",
name:"chartType_label",
size:"190,20",
text:"Chart Type",
transparent:true,
typeid:7,
uuid:"DE4AC5F0-4E94-499C-9A7D-0F6E143A158D"
},
{
dataProviderID:"shipvia",
location:"20,250",
name:"shipvia",
size:"190,30",
text:"Shipper",
typeid:4,
uuid:"E61D44DE-F46F-4FB7-BB5C-E384C8CB65D7",
valuelistID:"364ABB20-3F0C-47F4-8498-9EAA691C3FC4"
},
{
dataProviderID:"chartType",
displayType:2,
editable:false,
formIndex:2,
location:"20,310",
name:"chartType",
onDataChangeMethodID:"96C5C75D-D209-4860-A03A-B2856DC4AEA1",
size:"190,30",
typeid:4,
uuid:"EF55B534-80B3-400C-BB23-9AFF01C95971",
valuelistID:"DD071E36-8A9A-44F1-8C89-612961FDE3E0"
}
],
name:"orderDetail",
showInMenu:true,
size:"620,580",
typeid:3,
uuid:"D530DD1D-5DC9-4DE2-92CE-4A4F9C8C6BCB",
view:5