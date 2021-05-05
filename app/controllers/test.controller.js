const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/index");
const {TestModal,TestCreated} = db.test ;

dict = {
4021 : "html",
4022 : "html",
4023 : "css",
4028 : "mysql",
4029 : "mongodb",
4031 : "git",
4032 : "reactNative",
4027 : "php",
4057 : "c-sharp",
4058 : "c-sharp",
4037 : "java",
4024 : "java",
4088 : "angular",
4089 : "angular",
4114 : "python",

}


exports.updateTests =  (req,res) => {
for (const obj in dict) {
    const url = 'https://www.vskills.in/practice/index.php?route=free/test/getTest&topic_id=' + obj;//This is simple Angular Test
    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let questions = $('.question').text();
        modified_question = [];
        modified_options = [];
        let options = $('.options').text();
        let title = $(".pull-right").text() ;
        questions.split('\n').map(question => {
            if (question){
                question = question.replace(/\s+/g, ' ').trim();
                modified_question.push(question);
            }
        });
        options.split('\n').map(option => {
            option = option.replace(/\s+/g, ' ').trim();
            modified_options.push(option);
        });
        options = [];
        modified_options.map(option => {
            if (option !== ''){
                options.push(option)
            }
        })
        options1 = [];
        let j = 0 ;
        for (let i = 0 ; i<options.length ; j++) {
           options1.push(options.splice(i,4));
        }
        questions = [];
        modified_question.map(question => {
            if (question !== '') 
                questions.push(question);
        })

        const testModal = new TestModal({
            type: dict[obj],
            questions: questions,
            options: options1
        })

        testModal.save((err,test)=>{
            if (!err){
                console.log(" Test Registered Successfully ");
            }
            else {
                res.status(500).send(" Update failed ");
            }
        })

    })
    .catch(console.error);
}
}
exports.createTest = (req,res) => {
    questions = [];
    options = [];
    const types = req.params.type.split(',') ;
        TestModal.find({type : {$in:types} })
                .exec((err,tests)=>{
                    if (err) {
                        res.status.send(err);
                    }
                    tests.map(test => {
                    questions.push(test.questions) ;
                    options.push(test.options);
                    })
                    const testCreated = new TestCreated({
                        questions: questions,
                        options: options
                    })
                    testCreated.save((err,test)=>{
                        if (err) {
                            res.status(500).send(err);
                            return;
                        }
                        res.status(200).send([questions,options]);
                    })
                })
}