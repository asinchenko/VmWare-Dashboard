import Images from './images.logic.js';

export default class IMGsController {
    static async apiGetIMGs(req, res, next) {
        const imgPerPage = req.query.imgPerPage ? parseInt(req.query.imgPerPage):0;
        const page = req.query.page ? parseInt(req.query.page, 10):0;

        let filters = {}
        if (req.query.status) {
            filters.status = req.query.status
        }else if (req.query.name) {
            filters.name = req.query.name
        }

        const {myFile, totalNumberIMGs} = await Images.getIMGs({
            filters,
            page,
            imgPerPage,
        })

        let response = {
            images: myFile,
            page: page,
            filters,
            entries_per_page: imgPerPage,
            total_results: totalNumberIMGs,
        }
        res.json(response)
    };

    static async apiPostIMG(req, res, next) {
    try {
        const imgFile = req.body.myFile;
        const description = req.body.description;
        const imgPost = await Images.addIMG(
            imgFile, 
            description, 
        );
        res.json({status:"success post"});
    }catch(e) {
        res.status(500).json({error: e.message});
    }
    };

        static async apiDeleteIMG(req, res, next) {
            try {
                const imgId = req.body._id;
                console.log(imgId)
        
                const imgUpdate = await Images.deleteIMG(
                    imgId, 
                );
                res.json({status:"success"})
            }catch(e) {
                res.status(500).json({error: e.message});
            }
        };

        static async apiGetIMGByDescription(req, res,next){
            try {
                let id = req.params.description || {}
                let img_list = await Images.getIMGByDescription(id)
                if (!img_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
                res.json(img_list)
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetIMGByDate(req, res,next) {
            try {
                let lastUpdate = await Images.getIMGByDate()
                res.json(lastUpdate)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

}