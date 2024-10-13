import { Injectable } from "@nestjs/common";
const FormData = require("form-data");
import axios from "axios";
const myEmail = "shaxriyorziyodullayev816@gmail.com";
const login = "DvcIm7wWHW95yfX2Q8D2jOWvUOpqZGWTVWEZ6bMP";

@Injectable()
export class SmsService {
  async sendSms(phone_number: string, otp: string) {
    const data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", "This is test from Eskiz");
    data.append("from", "4546");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }

  async getToken() {
    const data = new FormData();
    data.append("email", myEmail);
    data.append("password", login);
    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://notify.eskiz.uz/api/auth/login",
      data: data,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async refreshToken() {
    const config = {
      method: "PATCH",
      maxBodyLength: Infinity,
      url: "https://notify.eskiz.uz/api/auth/refresh",
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
    };
    try {
      const response = await axios(config);
    } catch (error) {
      console.error(error);
    }
  }
}
