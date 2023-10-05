import {Router} from 'express'
import { BASE_URL } from '../app.js'
export const router=Router()


router.get('/', async (req, res) => {
    const queryObj = req.query
    const queryString = Object.keys(queryObj)
        .map(key => `${key}=${queryObj[key]}`)
        .join('&');
        const resp = await fetch(BASE_URL+'/api/products?'+queryString)
        const data = await resp.json()
        
        console.log("data",data)
    res.status(200).render('home', {data});
})


router.get('/realtimeproducts', async (req, res) => {
    const queryObj = req.query
    const queryString = Object.keys(queryObj)
        .map(key => `${key}=${queryObj[key]}`)
        .join('&');
        const resp = await fetch(BASE_URL+'/api/products?'+queryString)
        const data = await resp.json()

    res.status(200).render('realTimeProducts', {data})
})

router.get('/chat', (req,res)=> {
    console.log("chat aca")
    res.setHeader('Content-Type','text/html');
    res.status(200).render('chat');
  })

  const auth=(req, res, next)=>{
    if(req.session.usuario){
      next()
    }else{
      return res.redirect('/login')
    }
  }
  const auth2=(req, res, next)=>{
    if(req.session.usuario){
      return res.redirect('/perfil')
    }else{
      next()      
    }
  }


  router.get('/registro',auth2, (req,res)=> {

    res.status(200).render('registro');
  })
  router.get('/login',auth2, (req,res)=> {

    res.status(200).render('login');
  })
  router.get('/perfil',auth, (req,res)=> {
    
    res.status(200).render('perfil');
  })


