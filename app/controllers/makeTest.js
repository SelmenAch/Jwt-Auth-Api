const Test = require("../models/test.model");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/index");
const TestModel = db.test ;

dict = {
4021 : "html",
4022 : "html",
4023 : "css",
4028 : "mysql",
4029 : "mongodb",
4031 : "git",
4032 : "reactNative",
4033 : "reactNative",
4027 : "php",
4038 : "php",
4052 : "php",
4053 : "php",
4054 : "php",
4055 : "php",
4056 : "php",
4057 : "c-sharp",
4058 : "c-sharp",
4059 : "c-sharp",
4060 : "c-sharp",
4039 : "c-sharp",
4037 : "java",
4024 : "java",
4040 : "java",
4047 : "java",
4048 : "java",
4049 : "java",
4050 : "java",
4051 : "java",
4061 : "java",
4062 : "java",
4063 : "java",
4064 : "java",
4065 : "java",
4026 : "angular",
4082 : "angular",
4083 : "angular",
4084 : "angular",
4085 : "angular",
4086 : "angular",
4087 : "angular",
4088 : "angular",
4089 : "angular",
4114 : "python",
4116 : "python",
4041 : "python",
4042 : "python",
4043 : "python",
4044 : "python",
4045 : "python",
4046 : "python",
4036 : "python" 
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
        console.log(title);
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

        const test = new Test({
            type: dict[obj],
            questions: questions,
            options: options1
        })

        test.save((err,test)=>{
            if (!err){
                res.status(200).send(" Test Registered Successfully ");
            }
            else {
                res.status(500).send(" Update failed ");
            }
        })

    })
    .catch(console.error);
}
}
exports.getNewTest = (req,res) => {
    questions = [];
    options = [];
    const type = req.body.type.split(',') ;
        TestModel.find({type : {$in:type} })
                .exec((err,tests)=>{
                    tests.map(test => {
                    questions.push(test.questions) ;
                    options.push(test.options);
                    })
                    res.status(200).send([questions,options]);
                })
}

//test types

/* 
python
angular
javascript
perl
reactjs
react native
java
php
symphony
laravel
c
c++
csharp

*/