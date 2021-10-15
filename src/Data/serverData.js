import axios from "axios";
import dateFormat from "dateformat";
const baseurl = "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";

const token = JSON.parse(localStorage.getItem("Token"));

export const getDashboardData = (to, days="") =>(
    axios.get(`${baseurl}${to}${days}`,{
        headers: {
            Authorization: token.Authorization,
        }
    }).then(res=>res.data))

export const getOrderDetails = (to, type="",id="") =>(
    axios.get(`${baseurl}${to}${type}${id}`,{
        headers: {
            Authorization: token.Authorization,
        }
    }).then(({data})=>data))


export const getOrderData = (to, type="",id="") =>(
    axios.get(`${baseurl}${to}${type}${id}`,{
        headers: {
            Authorization: token.Authorization,
        }
    }).then(({data})=>{
        switch (type){
            case "disputed":
                return (data.map((item,index) =>({
                    "S.No.": index+1,
                    "Order Id": item.orderId,
                    "Delivery Address": item.userAddress,
                    "Date & Time": dateFormat(item.disputedAt,"h:MM tt, dd/mm/yyyy"),
                    "Contact": item.userPhone ,
                    "Action": item.resolvedAt?true:false,
                })))
            case "denied":
                return (data.map((item,index) =>({
                    "S.No.": index+1,
                    "Order Id": item.orderId,
                    "Delivery Address": item.addressData,
                    "Contact": item.userPhone,
                    "Order Type": item.orderType,
                    "Delivery Time": dateFormat(item.deliveryTime,"h:MM tt, dd/mm/yyyy"),
                })))
            case "":
                return (data.map((item, index)=>({
                    "Order Id": item.id,
                    "Delivery Address": item.address.addressData,
                    lat: item.address.latitude,
                    long: item.address.longitude,
                    "Date & Time": `Start Date${dateFormat(item.startDate,": mmm dd,yyyy")}, Delivery Time${dateFormat(item.deliveryTime,": h:MM tt,")} 
                    ${item.weekdays.join(",")}`,
                    "Mode": item.mode,
                    "Amount": item.amount,
                    "Items": item.items.map(a=>`${a.name}-${a.quantity} x ${a.baseQuantity}`).join(","),
                    Action: "",
                })))
            case "item":
                return data.map((item, index)=>({
                    "S.No": item.id,
                    categoryID: item.categoryID,
                    "Image": item.itemImageLinks[0],
                    "name": item.name,
                    "Bese Qty.": item.baseQuantity,
                    "Price (per Base Qty.)": item.price,
                    "In Stock": item.inStock,
                }))
            case "unassigned":
                return data.map((item, index)=>({
                    "S.No": index+1,
                    "Order Id": item.orderId,
                    "Customer Address": item.addressData,
                    "Contact": item.userPhone,
                    "Order Type": item.orderType,
                    "Status": item.status
                }));
            case "active":
                return data.map((item,index)=>({
                    "Order Id": item.orderID,
                    "Delivery Address": item.userAddress,
                    "Contact": item.userPhone,
                    "Order Type / Order Mode": `${item.orderType}/${item.orderMode}`,
                    "Date & Time": dateFormat(item.deliveryTime,"h:MM tt, dd/mm/yyyy"),
                    "Items": item.items.map(a=>`${a.name}-${a.quantity} x ${a.baseQuantity}`).join(","),
                }));
            default:
                return (data);
        }
    }))




export const getUserData = (to, type="",id="") =>(
    axios.get(`${baseurl}${to}${type}${id}`,{
        headers: {
            Authorization: token.Authorization,
        }
    }).then(({data})=>{
        if(type===""){
            return (data.map(item =>({
                id: item.id,
                "Name": item.name,
                "Contact": item.contact,
                "Registration Date": dateFormat(item.regDate,"dd/mm/yyyy"),
                "Primary Location":  item.defaultAddress,
                lat: item.defaultAddressLat,
                long: item.defaultAddressLong,
                "Top Three Items": item.topThreeItems.length===0?["","",""]:
                    item.topThreeItems.length===1?[...item.topThreeItems,"",""]:
                        item.topThreeItems.length===1?[...item.topThreeItems,""]:
                            item.topThreeItems,
                "Top Three Locations": item.topThreeLocation.length===0?["","",""]:
                    item.topThreeLocation.length===1?[...item.topThreeLocation.map(it=>it.addressData),"",""]:
                        item.topThreeLocation.length===2?[...item.topThreeLocation.map(it=>it.addressData),""]:
                            item.topThreeLocation.map(it=>it.addressData),
                "Total Orders":  item.totalOrders,
                "Total Amount": item.totalAmount,
                "Denied":  item.deniedOrders,
                "Canceled":  item.canceledOrders,
                "Average Rating":  parseInt(parseFloat(item.avgRating)*10)/10,
                "Flagged":  item.flagCount,
            })))
        }
        else{
            return (data.map(item=>({
                id: item.id,
                "Name": item.name,
                "Contact": item.contact,
                "Registration Date": dateFormat(item.regDate,"dd/mm/yyyy"),
                "Profile": item.profileImageLink,
                "Total Orders": item.totalOrders,
                "Denied": item.deniedOrders,
                "Canceled": item.canceledOrders,
                "Total Business": parseInt(parseFloat(item.totalAmount)*100)/100,
                "Average Rating": parseInt(parseFloat(item.avgRating)*10)/10,
                "Flagged": item.flagged,
                "Enable/ Disable": item.enabled,
            })))
        }
    }))

export const changeUser = async (to, id="",data) => {
    await axios.put(`${baseurl}${to}${id}`, data, {
        headers: {
            Authorization: token.Authorization,
        }
    }).then(res  => res )
}



export const login = (data) =>(
    axios.post(`${baseurl}/api/sm-login`,
    JSON.stringify({
        email: data.id,
        password: data.password
    })).then(res=>{
        if(res.status>=200&&res.status<=299){
            return {error:false,...res.data}
        }
        else{
            return({
                error:true,
                isErrorId: true,
                idErrorText: "Incorrect id or password.",
                isErrorPassword: true,
                passwordErrorText: "Incorrect id or password."
            })
        }
    }))


export const deleteOrder = (to,key) =>
    (axios.delete(`${baseurl}${to}${key}`,{
        headers: {
            Authorization: token.Authorization,
        }
    }).then((res)=>res))

