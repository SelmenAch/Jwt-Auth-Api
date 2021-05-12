const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/index");
const jsdom = require("jsdom");
const {TestModal,TestCreated} = db.test ;
const Offer = db.offer ;
dict = {
7040905 : "python",
7040708 : "angularJs",
7040920: "angular",
7040869 : "laravel",
7040908 : "php",
7040741 : "java",
7040831 : "nodejs",
7040714 : "sql",
7040824 : "html",
7040746 : "css",
7040720 : "reactjs",
7040867 : "reactnative",
7040879 : "flutter",
7040675 : "c-sharp",
7040689 : "c++",
7040694 : "c",
7040705 : "go",
7040700 : "git",
7040735 : "kotlin",
7040750 : "asp.net",
7040758 : "shell scripting",
7040769 : "docker",
7040797 : "kuberneties",
7040916 : "joomla",
7040803 : "cloud computing",
7040820 : "devops",
7040827 : "restApi",
7040839 : "xml",
7040849 : "mean",
7040859 : "ionic",
7040873 : "dart",
7040885: "android",
7040823: "wordpress"
}


exports.generateTests =  (req,res) => {
    for (let obj in dict){
    const url = 'https://www.vskills.in/practice/index.php?route=quiz%2Fquiz%2FanswerSheet&quiz_id=' + obj;//This is simple Angular Test
    const questions = [];
    let allQuestions = [];
    const options = [];
    let allOptions = [];
    let allGreens = [];
    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        $(".list-unstyled").each(function(i,ele) {
            $('p>strong').each(function(){
                questions.push($(this).text().trim());
            });
        })
        /*for (let i=0 ; i< questions[0].length ; i++) {
            if ( i%2 == 0) allQuestions.push(questions[0][i].trim());
            else allOptions.push(questions[0][i].split('\n')
                                                .map(option => option.trim())
                                                .filter(option => option != ''));
        }*/
        allQuestions = questions.filter(q => q != '' && q!= 'Given:' && q!='What is the result?');
        // console.log(allOptions.length);
        $('.options').each(function(){
            options.push($(this).text());
        })
        options.map(option =>{
            const opt = option.split('\n').map(o => o.trim()).filter(o => o !== '')
            allOptions.push(opt);
        })
        $('.green').each(function() {
            allGreens.push($(this).text().trim());
        })
        
       const testModal = new TestModal({
            type : dict[obj],
            questions: allQuestions,
            options: allOptions,
            greens: allGreens
        })
        testModal.save((err,test)=>{
            if (err) {
                res.status(500).send("Erreur while saving the test");
            } else {
                console.log("Test registered successfully !!")
            }
        })
    })

}
}

exports.createTest = (req,res) => {
    const questions = [];
    const options = [];
    const greens = [] ;

    const genQuestions = [] ;
    const genOptions = [] ;
    const genGreens = [] ;


    const types = req.params.type.split(',') ;
    console.log(types);
        TestModal.find({type : {$in:types} })
                .exec((err,tests)=>{
                    if (err) {
                        res.status.send(err);
                    }
                    tests.map(test => {
                        test.questions.map(question =>{
                            questions.push(question);
                        }) ;
                        test.options.map(option =>{
                            options.push(option);
                        }) ;
                        test.greens.map(green =>{
                            greens.push(green);
                        }) ;
                    }) ;
                    for (let j=0 ; j < greens.length ; j++) {
                        if (questions[j] == '') {
                            questions.splice(j,1) ;
                            greens.splice(j,1);
                            options.splice(j,1);
                        }
                    }
                    let randomIndexes = getRandomIndexes(greens.length , 30);
                    console.log(randomIndexes);
                    for (let i = 0 ; i< randomIndexes.length ; i++) {
                        genQuestions.push(questions[randomIndexes[i]]);
                        genOptions.push(options[randomIndexes[i]]);
                        genGreens.push(greens[randomIndexes[i]]);
                    } 
                   
                    
                    const testCreated = new TestCreated({
                        questions: genQuestions,
                        options: genOptions,
                        greens: genGreens
                    })
                    testCreated.save((err,test)=>{
                        if (err) {
                            res.status(500).send(err);
                            return;
                        }
                        res.status(200).send([genQuestions,genOptions,genGreens , [testCreated._id]]);
                    })
                })
}



function getRandomIndexes(taille , nombre) {
    let indexes = []; 
    while (indexes.length < nombre ){
        let i = Math.floor(Math.random() * taille) ;
        test = false ;
        for (let j=0 ; j < indexes.length ; j++) {
            if (indexes[j] === i) test = true ;
        }
        if (!test) indexes.push(i);
    }
    return indexes ;
}