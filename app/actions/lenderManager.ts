"use server";

import client from "@/db/index"
import { z } from "zod";

interface LendingUser{
    name : string,
    phoneNo : string,
    state : string,
    city : string,
    pincode : string,
    address : string
}
export async function CreateLendingUser(lendingUser : LendingUser){

    const username = "mahidhar100008@gmail.com";

 const alreadyUserExist = await client.lendingUser.findUnique({
  where: {
    name: lendingUser.name,
  },
});

if (alreadyUserExist) {
  throw new Error("User already exists!");
}


    const user = await client.lendingUser.create({
        data : {
        ...lendingUser , username
        }
    });
}