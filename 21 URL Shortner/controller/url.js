const shortid = require('shortid');   
const URL = require('../models/url');

 async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({err: 'url is required'})
    const shortId = shortid();

    await URL.create({
        shortId: shortid,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.json({id: shortId});
    
 }

 async function handleGetAnalytics(req,res){
   const shortId = req.params.shortId;
   const result = await URL.findOne({shortId})
   return res.json({

   })

 }

 module.exports = {
    handleGenerateNewShortURL
 }