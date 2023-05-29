import Excel from './excel.logic.js';

export default class ExcelController {
    static async apiGetExcels(req, res, next) {
        const excelPerPage = req.query.excelPerPage ? parseInt(req.query.excelPerPage):0;
        const page = req.query.page ? parseInt(req.query.page, 10):0;

        let filters = {}
        if (req.query.status) {
            filters.status = req.query.status
        }else if (req.query.name) {
            filters.name = req.query.name
        }

        const {excelList, totalNumberExcels} = await Excel.getExcel({
            filters,
            page,
            excelPerPage,
        })

        let response = {
            excels: excelList,
            page: page,
            filters,
            entries_per_page: excelPerPage,
            total_results: totalNumberExcels,
        }
        res.json(response)
    };

    static async apiPostExcel(req, res, next) {
    try {
        const excel = req.body.excel;
        const title = req.body.title;
        const excelPost = await Excel.addExcel(
            excel, title
        );
        res.json({status:"success post"});
    }catch(e) {
        res.status(500).json({error: e.message});
    }
    };

    static async apiUpdateExcel(req, res, next) {
        try {
            const _id = req.body._id;
            const excel = req.body.excel;
            const document = req.body.document;
            const type = req.body.type;
            const tags = req.body.tags;
            const date = req.body.date;
    
            const excelUpdate = await Excel.updateExcel(
                _id, excel,document, type,tags,date
            );
            
            var {error} = excelUpdate
            if (error) {
                res.status(400).json({error})
            }
            if (excelUpdate.modifiedCount === 0) {
                throw new Error(
                    `Unable to update review, data hasn't changed or user is not valid`
                )
            }
            res.json({status:"success update"});
        }catch(e) {
            res.status(500).json({error: e.message});
        }
        };

        static async apiDeleteExcel(req, res, next) {
            try {
                const excelId = req.body._id;
        
                const excelUpdate = await Excel.deleteExcel(
                    excelId, 
                );
                res.json({status:"success"})
            }catch(e) {
                res.status(500).json({error: e.message});
            }
        };

        static async apiDeleteExcelById(req, res,next){
            try {
                let id = req.params.id || {}
                let excel_list = await Excel.deleteExcel(id)
                if (!excel_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetExcelById(req, res,next){
            try {
                let id = req.params.id || {}
                let excel_list = await Excel.getExcelByID(id)
                if (!excel_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
                res.json(excel_list)
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };
        static async apiGetExcelByName(req, res,next){
            try {
                let name = req.params.name || {}
                console.log(name)
                let excel_list = await Excel.getExcelByName(name)
                if (!excel_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
                res.json(excel_list)
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetExcelByState(req, res,next) {
            try {
                let states = await Excel.getExcelByState()
                res.json(states)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetExcelByDate(req, res,next) {
            try {
                let lastUpdate = await Excel.getExcelByDate()
                res.json(lastUpdate)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

}