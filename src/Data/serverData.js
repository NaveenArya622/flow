import axios from "axios";
import dateFormat from "dateformat";
const baseurl = "https://dev-api.yourdaily.co.in";

const token = JSON.parse(localStorage.getItem("Token"));

export const getDashboardData = (to, days="") =>(
    axios.get(`${baseurl}${to}${days}`,{
        headers: {
            Authorization: token.Authorization,
        }
    }).then(res=>res.data))





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
                    "Action": item.resolvedAt?dateFormat(item.resolvedAt,"h:MM tt, dd/mm/yyyy"):null,
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
                    "S.No.": index+1,
                    "Order Id": item.orderId,
                    "Delivery Address": item.userAddress,
                    "Scheduled On": dateFormat(item.scheduledOn,"h:MM tt, dd/mm/yyyy"),
                    "Scheduled For": dateFormat(item.scheduledFor,"h:MM tt, dd/mm/yyyy"),
                    "Contact": item.userPhone ,
                })))
            case "item":
                return data.map((item, index)=>({
                    "S.No": item.id,
                    categoryID: item.categoryID,
                    "Image": item.itemImageLinks[0],
                    "name": item.name,
                    "Bese Qty.": item.baseQuantity,
                    "Price (per Base Qty.)": `Rs.${item.price}`,
                    "In Stock": item.inStock,
                }))
            case "unassigned":
                return data;
            case "active":
                return data.map((item,index)=>({
                    "Order Id": item.orderID,
                    "Delivery Address": item.userAddress,
                    "Contact": item.userPhone,
                    "Order Type / Order Mode": `${item.orderType}/${item.orderMode}`,
                    "Date & Time": dateFormat(item.deliveryTime,"h:MM tt, dd/mm/yyyy"),
                    "Items": item.items.map(a=>a.name).join(","),
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
