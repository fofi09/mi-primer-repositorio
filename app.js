import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";
    
const app = express();
app.use(bodyParser.json()); 
//app.use(bodyParser.json());
//app.use(bodyParser.json()) //entiene q al pasarle los datoss los pasa tipo json

const readData=()=>{

     try{
const data = fs.readFileSync("./db.json");

 return JSON.parse(data);
   }
    catch(error){
  console.log(error);
    }
console.log(JSON.parse(data));
};


const writeData= (datoss)=>{
    try {
        fs.writeFileSync("./db.json",JSON.stringify(datoss));
    }   
            catch(error){
                console.log(error);
            }
        };

//readData();

app.get( '/', ( req, res ) => {
    res.send("hola");
});

app.get( "/alumnos", (req,res)=> {

    const data= readData();  
    
    res.json(data.alumnos) ;
});
app.get("/alumnos/:id",(req, res)=>{
    const data= readData();  
    const id=parseInt(req.params.id);
    const idalumno=data.alumnos.find((idalumno)=> idalumno.id=== id);
    res.json(idalumno) ;
});



// app.delete('/alumnos/:id',(req,res)=>{
//     const dato = readData();  
//     const filtrado=dato.alumnos.filter((el)=> el.id !== req.params.id);
//     dato.alumnos=filtrado;
//     writeData(dato);
//     res.status(204).send('Eliminado')  
// }); 



app.post("/alumnos", (req,res)=>{
    const data = readData(); 
    const body= req.body;
    const newAlumno= {
        id: data.alumnos.length + 1,
        ...body,
    };
    data.alumnos.push(newAlumno);
    writeData(data);
    res.json(newAlumno);
    });

 



    /////ESTE ES EL DE ABAJO

app.put("/alumnos/:id", (req, res)=>{
    const data= readData();  
    const bodyy= req.body;
    const id=parseInt(req.params.id);
   
    
    const alumnoindex = data.alumnos.findIndex((alumno)=> alumno.id === id);
    data.alumnos[alumnoindex] = {
        ...data.alumnos[alumnoindex],
        ...bodyy,
    };

     writeData(data);
    //res.json(data.alumnos[alumnoindex]);
    //json con minuscula
    res.json({message:"se actualizo correctamente"});
});
    
app.delete("/alumnos/:id", (req, res)=> {

    const data = readData();
    const id = parseInt(req.params.id) ;
    const alumnoindex = data.alumnos.findIndex((alumno)=> alumno.id === id);
    data.alumnos.splice(alumnoindex, 1);
    writeData(data);
    res.json("se elimino correctamente");


})
//////////////////
// app.put("/alumnos/:id", (req, res) => {
//     const data = readData();
//     const body = req.body;
//     const id = parseInt(req.params.id);

//     const alumnoIndex = data.alumnos.findIndex((alumno) => alumno.id === id);
//     if (alumnoIndex !== -1) {
//         // Actualizamos los campos del alumno existente en lugar de crear uno nuevo
//         data.alumnos[alumnoIndex] = {
//             ...data.alumnos[alumnoIndex],
//             ...body,
//         };
//         writeData(data);
//         res.json("actualizado");
//     } else {
//         // Si no se encuentra el alumno, devolvemos un error
//         res.status(404).json({ message: "Alumno no encontrado" });
//     }})




app.listen(3009, () => {
  console.log('el servidor esta escuchando en el puerto 3009..-');
});