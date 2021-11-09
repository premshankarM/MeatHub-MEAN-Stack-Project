const env = process.env.NODE_ENV||'development';

const config = {
  
    'development':{
      'secret_key':'***',
       db:{
         host:'localhost',
         username:'root',
         password:'',
         dialect:'mysql',
         db:'test_dev'  
       },
       pg:{
         api_key:"",
         api_secret:""
       },
       static_path:"http://localhost:3000/static/images/" 
    },
    'test':{
      
    },
    'prod':{
      'secret_key':'***',
       db:{
         host:'localhost',
         username:'***',
         password:'***',
         dialect:'mysql',
         db:'meathub_prod'  
       },
       pg:{
         api_key:"",
         api_secret:""
       },
       static_path:"https://api.meathub.co.in/static/images/" 
    }
}

export default config[env];