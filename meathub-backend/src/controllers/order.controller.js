import Order from '../models/order.model'
import Razorpay from 'razorpay';
import config from '../configs/config';
class OrderController {

    getOrders(req){
       return new Promise((resolve, reject) => {
        Order.findAll({where:{	order_status:"created"}})
        .then((result) => {
            resolve([result,'Success'])
        }).catch((err) => {
            reject([500,{msg:'Internal Error',error:err}])
        }); 
       });    
    }
    updateOrder(req){
        return new Promise((resolve, reject) => {
            Order.update({
                order_status:"completed"
            },{
                where:{order_unique_id:req.body.order_unique_id},
                returning:true,
                plain:true
            })
            .then((result) => {
                resolve([result,"kaja"])
            }).catch((err) => {
                reject([500,{msg:'Internal error',error:err}]) 
            });
            
        });
    }
    getCustOrders(req){
        return new Promise((resolve, reject) => {
            Order.findAll({
                where:{
                    user_id:req.decoded_token.id
                },
                attributes:{ 
                    exclude: ['payment_id','payment_order_id','payment_status'] 
                }
            })
            .then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:'Internal error',error:err}])
            });
        });
    }
    createOrder(req){
        return new Promise((resolve, reject) => {

            Order.create({
                order_amount:req.body.amount,
                order_data:req.body.cart,
                order_status:"pending",
                payment_status:"pending",
                email:req.body.email,
                user_id:req.decoded_token.id,
                delivery_address:req.body.order_data,
            }).then((order) => {
                const rp = new Razorpay({
                    key_id: config.pg.api_key,
                    key_secret: config.pg.api_secret
                  });
                 rp.orders.create({amount:req.body.amount*100,
                    currency:"INR",
                    receipt:null,
                    payment_capture:1,
                    notes:[]})
                 .then((result) => {
                    order.update({
                        payment_order_id:result.id
                    })
                    .then((updatedorder) => {
                        if(result){
                            var response_data = {};
                            response_data.order_id = result.id;
                            response_data.order_unique_id = order.order_unique_id;
                            resolve([response_data,"Success"])
                        }else{
                            reject([500,"Internal Error"])
                        }
                    }).catch((err) => {
                        reject([500,{msg:"Internal Error",error:err}])
                    });
                 }).catch((err) => {
                    reject([500,"Internal Error"])
                 });
            }).catch((err) => {
                reject([500,{msg:"Internal Error",error:err}])
            });


            
            
        });
    }
    processOrder(req){
        return new Promise((resolve, reject) => {
            Order.update({
                payment_status:"captured",
                order_status:"created",
                payment_id:req.body.p_id
            },{
                where:{user_id:req.decoded_token.id,order_unique_id:req.body.order_unique_id},
                returning:true
            })
            .then((result) => {
                if(result){
                    resolve([null,"Success"])
                }else{
                    reject([500,"Internal Error"])
                }
            }).catch((err) => {
                reject([500,{msg:"Internal Error",error:err}])
            });
        });
    }
    refundOrder(req){
     
    OrderController.findOne({where:{order_unique_id:req.body.uuid}})
    .then((result) => {
        const instace=new Razorpay({
            key_id:config.pg.api_key,
            key_secret:config.pg.api_secret
        })
        instace.payments.refund(result.payment_id,{amount:(result.order_amount*100),notes:[]})
        .then((res) => {
            OrderController.update({
                order_status:"refunded"
            }).then((result) => {
                resolve([null,"Success"])
            }).catch((err) => {
                reject([500,{msg:"Internal Error",error:err}])
            });
        }).catch((err) => {
            reject([500,{msg:"Internal Error",error:err}])
        });
    }).catch((err) => {
        reject([500,{msg:"Internal Error",error:err}])
    });
}
}
export default new OrderController();