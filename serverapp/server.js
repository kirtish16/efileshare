require('dotenv').config()
const multer = require('multer')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const File = require("./models/File")

const app = express() 

const cors = require('cors')
app.use(cors())


app.use(express.urlencoded({extended:true}))

const upload = multer({dest:"uploads"})

mongoose.connect(process.env.DATABASE_URL)


app.post("/upload", upload.single('file'),async (req,res)=>{
    const fileData = {
        path : req.file.path , 
        originalName : req.file.originalname
    }

    if (req.body.password != null && req.body.password != ""){
        fileData.password = await bcrypt.hash(req.body.password,10)
    }

    const file = await File.create(fileData)
    res.json({fileLink : `${req.headers.origin}/file/${file.id}`})
})


app.get("/file/:id",handleDownload)
app.post("/file/:id",handleDownload)

async function handleDownload(req, res) {
    
  const file = await File.findById(req.params.id)

  if(file == null){
      res.json({"notFound":true})
    return    
  }

  if (file.password != null) {
    if (req.body.password == null) {
        res.json({"password":false})
      return
    }

    if (!(await bcrypt.compare(req.body.password, file.password))) {
      res.json({"password":false, error: true })
      return
    }
  } 

  file.downloadCount++
  await file.save()

  res.json({"name":file.originalName})
}


app.get("/downloadfile/:id",handleDownloadFile)

async function handleDownloadFile(req, res) {
    
  const file = await File.findById(req.params.id)

  file.downloadCount++
  await file.save()

  if(file.downloadCount >= 1){
    File.deleteOne({_id:req.params.id},function (err, _) {
        if (err) {
            res.json({"notFound":true})
            return 
        }
    });
  }

  return res.download(file.path, file.originalName)
}

app.listen(process.env.PORT);