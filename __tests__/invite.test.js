const  request= require("supertest")
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const {app}=require("../server");
const db = require("../src/models");
const Player=db.players;

const config = require("../src/config/auth.config.js");
var jwt = require("jsonwebtoken");
describe('player', () => {
    jest.setTimeout(10000);
    beforeAll(async () => {

        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            
        })
        let coach = new Coach({
            username:"testcoach",
            email : "test@gmail.com",
            password : "123456789",
            tel : "97708977",
                        
        });
        coach = await coach.save();
        token = await jwt.sign({ id: coach.id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });
    
          
         
          
    })
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close()
       
    })
    test("should save Invited player in the database", async () => {
        let coach = new Coach({
            username:"testcoach",
            email : "test@gmail.com",
            password : "123456789",
            tel : "97708977",
                        
        });
        coach = await coach.save();
        const id = coach._id
        
        
        
        const response = await request(app).post(`/api/auth/${id}/invite`).set("x-access-token", token)
            .send({
                username:"azza14",
                email : "azza4@gmail.com",
                password : "123456789",
                firstname: "azza",
                lastname:"mannai"
            });
        const player = await Player.findOne({ email: "azza4@gmail.com" });
       
        expect(response.status).toBe(200);
        expect(player).not.toBeNull();
       
    });
    test("should retrun error when no email is provided", async () => {
        let coach = new Coach({
            username:"testcoach",
            email : "test@gmail.com",
            password : "123456789",
            tel : "97708977",
                        
        });
        coach = await coach.save();
        const id = coach._id
        
        
        
        const response = await request(app).post(`/api/auth/${id}/invite`).set("x-access-token", token)
            .send({
                username:"azza14",
                
                password : "123456789",
                firstname: "azza",
                lastname:"mannai"
            });
       
       
        expect(response.status).toBe(400);
       
       
    });
    test("should retrun error when no email is provided", async () => {  
        id="6286e01d5221b913411888"  
        const response = await request(app).post(`/api/auth/${id}/invite`).set("x-access-token", token)
            .send({
                username:"azza884",
                email:"test@user.com",
                password : "123456789",
                firstname: "azza",
                lastname:"mannai"
            });
       
       
        expect(response.status).toBe(400);
        expect(response.text).toBe("{\"message\":\"Failed! Email is already in use!\"}");
       
       
    });
    test("should retrun error when email is duplicated  ", async () => {
        let coach = new Coach({
            username:"testcoach",
            email : "test@gmail.com",
            password : "123456789",
            tel : "97708977",
                        
        });
        coach = await coach.save();
        const id = coach._id
        let player = new Player({
            username:"testcoach",
            email : "azza4@gmail.com",
            password : "123456789",
            tel : "97708977",
                        
        });
        await player.save();
       
        
        
        
        const response = await request(app).post(`/api/auth/${id}/invite`).set("x-access-token", token)
            .send({
                username:"azza78",
                email:"azza4@gmail.com",
                password : "123456789",
                firstname: "azza",
                lastname:"mannai"
            });
            
       
       
        expect(response.status).toBe(400);
        expect(response.text).toBe("{\"message\":\"Failed! Email is already in use!\"}");
       
       
    });
    
    
   
        
});