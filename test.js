const nodemailer = require('nodemailer');
const email = {
  host: "",
  port: ,
  auth: {
    user: "",
    pass: ""
  }
};


const send = async (option) => {
  nodemailer.createTransport(email).sendMail(option,(error, info) =>{
    if(error){
      console.log(error);
    }else{
      console.log(info);
      return info.response;
    }
  }); 
};

let email_data = {
  from: '',
  to:'',
  subject:'테스트 메일 입니다',
  text:'nodejs 한시간만에 끝내보자.'  
}

send(email_data);