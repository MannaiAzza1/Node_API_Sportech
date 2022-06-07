const  request= require("supertest")
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const {app}=require("../server");
const db = require("../src/models");
const Coach=db.coach;
Competence=db.competences;
var jwt = require("jsonwebtoken");
const config = require("../src/config/auth.config.js");

const { response } = require("express");
const competenceModel = require("../src/models/competence.model");
let token;


describe('competences', () => {

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
    test("should get all competences" ,async () => {
    const response = await request(app).get("/api/comp").set("x-access-token", token)
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(0)

    });
    test("should successfully create a competence" ,async () => {
        const data ={
            nb_stars : 3,
            title:"testComp",
            desc: "description",
            link:"www.youtube.com",
            isVisible:true,
            
        }
        const response = await request(app).post("/api/comp/create").set("x-access-token", token).send(data);
       
        const competence = await Competence.findOne({ title: "testComp" });
        expect(response.status).toBe(200);
        expect(competence).not.toBeNull();
        


       
        });
        test('should return 401 because token is false', async () => {
            const token = "14788595abche"
            const response = await request(app).get("/api/comp").set("x-access-token", token)
            expect(response.status).toBe(401);
            expect(response.text).toBe("Unauthorized!");
           
        });
        test('should return 403 because user is not logged in ', async () => {
          
            const response = await request(app).get("/api/comp")
            expect(response.status).toBe(403);
            expect(response.text).toBe("No token provided , u need to log in !" );
           
        });
        test('should update competence sucessfully ', async () => {
          
            const data ={
                nb_stars : 3,
                title:"testComp",
                desc: "description",
                link:"www.youtube.com",
                isVisible:true,
                
            }
            
           
        });
        test("should return Competence successfully when passed id", async () => {
            
            const competence = new Competence({
                nb_stars : 3,
                title:"testComp",
                desc: "description",
                link:"www.youtube.com",
                isVisible:true,
            });
            await competence.save();
            const response = await request(app).get(`/api/comp/${competence._id}`).set("x-access-token", token)
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                nb_stars : 3,
                title:"testComp",
                desc: "description",
                link:"www.youtube.com",
                isVisible:true,
            });
        });
        test("Should successfully update competence", async () => {
            
                const competence = new Competence({
                    players: [],
                    nb_stars: 3,
                    title: "title 5",
                    desc: "description",
                    link: "www.youtube.com",
                    isVisible: true,
                    __v: 0
                });
            
            await competence.save();
            const response = await request(app)
                .put(`/api/comp/${competence._id}/update`)
                .set("x-access-token", token)
                .send({desc:"this is a new testing description"});
    
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                players: [],
                nb_stars: 3,
                title: "title 5",
                desc: "this is a new testing description",
                link: "www.youtube.com",
                isVisible: true,
                __v: 0
            });

            
           


           
        });
        test("Should return 404 when competence is not found", async () => {
            
            
        let id ="628607a753e3080e686eea89"
    
        const response = await request(app)
            .put(`/api/comp/${id}/update`)
            .set("x-access-token", token)
            .send({title:"this is a new testing title"});

        expect(response.status).toBe(404);
        expect(response.text).toContain(`Cannot update Competence with id=${id}. Maybe  not found!`);
       
    });
    test("Should return 500 when id is invalid", async () => {
            
            
        let id ="helloworld"
    
        const response = await request(app)
            .put(`/api/comp/${id}/update`)
            .set("x-access-token", token)
            .send({title:"this is a new testing title"});

        expect(response.status).toBe(500);
        expect(response.text).toContain("Error updating Competence with id=" + id);
        
        

        
       


       
    });
    test("should delete successfully and return message", async () => {
        
        const competence = new Competence({
                players: [],
                nb_stars: 3,
                title: "title 5",
                desc: "this is a new testing description",
                link: "www.youtube.com",
                isVisible: true,
                __v: 0
        });
        await competence.save();

        const response = await request(app)
            .delete(`/api/comp/${competence._id}/delete`)
            .set("x-access-token", token);

        expect(response.status).toBe(200);
        expect(response.text).toContain("Competence was deleted successfully!");
    });
    test("should return error message when descriotion is empty while creating", async () => {
        
        const competence = new Competence({
                players: [],
                nb_stars: 3,
                title: "title 5",
                link: "www.youtube.com",
                isVisible: true,
                __v: 0
        });
        await competence.save();

        const response = await request(app)
            .post(`/api/comp/create`)
            .set("x-access-token", token);

        expect(response.status).toBe(400);
        
    });
    test("should return only visible competences ", async () => {
        
        const competence = new Competence({
                players: [],
                nb_stars: 3,
                title: "title 5",
                link: "www.youtube.com",
                isVisible: true,
                __v: 0
        });
        const competence2 = new Competence({
            players: [],
            nb_stars: 3,
            title: "title 5",
            link: "www.youtube.com",
            isVisible: false,
            __v: 0
    });
    await competence.save();
    await competence2.save();
    const data = [
        competence,
        competence2
    ]
        

        const response = await request(app)
            .get(`/api/comp/visible`)
            .set("x-access-token", token);

        expect(response.status).toBe(200);
        
    });
    
    
    


    
   
        
});