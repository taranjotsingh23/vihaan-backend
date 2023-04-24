const router = require("express").Router();
const User = require("../model/User");
const SelfAssessment = require("../model/SelfAssessment");

router.post("/selfassessment", async (req, res) => {
    var userId = req.body.userId;
    var symptom = req.body.symptom;
    var live = req.body.live;
    var exercise = req.body.exercise;
    var smoke = req.body.smoke;
    var scale = req.body.scale;

    //Create a new user
    const user = new SelfAssessment({
        userId: userId,
        symptom: symptom,
        live: live,
        exercise: exercise,
        smoke: smoke,
        scale: scale
    });

    var savedUser = await user.save();

    var score = 0;
    if (symptom == "Depressed Mood" || symptom == "Excessive Worry" || symptom == "Sleep Pattern Disturbance" || symptom == "Increased Irritability" || symptom == "Attention Deficiency") {
        score = score + 20;
    }
    if (live == "Yes") {
        score = score + 20;
    }
    if (exercise == "No") {
        score = score + 20;
    }
    if (smoke == "Yes") {
        score = score + 20;
    }

    if (scale >= 5) {
        score = score + 20;
    }
    else {
        score = score + 10;
    }

    var msg;
    var link;

    if (score == 80 || score == 90 || score == 100) {
        msg = "We're here for you. Please Contact Us for a Free Consultation session with our Expert";
        link = "helpline"
    }
    else if (score == 50 || score == 60 || score == 70) {
        msg = "Join Our Discord Community. We'll meet you there. We're waiting!!";
        link = "discord"
    }
    else {
        msg = "Join Our Music Therapy with Spotify and Vent it out!!";
        link = "spotify"
    }

    res.status(200).send({ resCode: 200, message: msg, link: link, score: score });
});


router.post("/selfassessment1", async (req, res) => {
    try{
    var userId = req.body.userId;
    var employment = req.body.employment
    // var mentallyIll = req.body.mentallyIll
    var education = req.body.education
    var own_computer = req.body.own_computer
    var hospitalized = req.body.hospitalized
    var hospitalized1 = req.body.hospitalized1
    var legally_disabled = req.body.legally_disabled
    var internet = req.body.internet
    var live_parents = req.body.live_parents
    var resume_gap = req.body.resume_gap
    var total_gap = req.body.total_gap
    var income = req.body.income
    var unemployed = req.body.unemployed
    var read_out_work_school = req.body.read_out_work_school
    var income_social_welfare = req.body.income_social_welfare
    var food_stamps = req.body.food_stamps
    var section_8 = req.body.section_8
    var hospitalized_times = req.body.hospitalized_times
    var lack_concentration = req.body.lack_concentration
    var anxiety = req.body.anxiety
    var depression = req.body.depression
    var obsessive_thinking = req.body.obsessive_thinking
    var mood_swings = req.body.mood_swings
    var panic_attacks = req.body.panic_attacks
    var compulsive_behavior = req.body.compulsive_behavior
    var tiredness = req.body.tiredness
    var age = req.body.age
    var gender = req.body.gender
    
    // const user = new SelfAssessment({
    //     userId,
        // employment ,
        // mentallyIll ,
        // education ,
        // own_computer ,
        // hospitalized ,
        // hospitalized1 ,
        // legally_disabled ,
        // internet ,
        // live_parents ,
        // resume_gap ,
        // total_gap ,
        // income ,
        // unemployed ,
        // read_out_work_school ,
        // income_social_welfare ,
        // food_stamps ,
        // section_8 ,
        // lack_concentration ,
        // anxiety ,
        // depression ,
        // obsessive_thinking ,
        // mood_swings ,
        // panic_attacks ,
        // compulsive_behavior ,
        // tiredness ,
        // age ,
        // gender ,
    // });

    // var savedUser = await user.save();

    // experiment
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./predict.py',
    employment ,
    // mentallyIll ,
    education ,
    own_computer ,
    hospitalized ,
    hospitalized1 ,
    legally_disabled ,
    internet ,
    live_parents ,
    resume_gap ,
    total_gap ,
    income ,
    unemployed ,
    read_out_work_school ,
    income_social_welfare ,
    food_stamps ,
    section_8 ,
    hospitalized_times,
    lack_concentration ,
    anxiety ,
    depression ,
    obsessive_thinking ,
    mood_swings ,
    panic_attacks ,
    compulsive_behavior ,
    tiredness ,
    age ,
    gender]);

    pyProg.stdout.on('data', function(data) {

        console.log(data.toString(),"klasdfklasf");
        
        if(data.toString() == 1){
            msg = "We're here for you. Please Contact Us for a Free Consultation session with our Expert";
        }
        else{    
            msg = "Join Our Music Therapy with Spotify and Vent it out!!";        
        }
        res.status(200).send({ resCode: 200, message: msg});
    });
    }
    catch(err){
        res.status(400).send({ resCode: 400, message: err});
    }
    
});


router.post("/selfassessment2", async (req, res) => {
    try{
    // var userId = req.body.userId;
    var age = req.body.age
    var gender = req.body.gender
    var tiredness = req.body.tiredness
    var compulsive_behavior = req.body.compulsive_behavior
    var panic_attacks = req.body.panic_attacks
    var mood_swings = req.body.mood_swings
    var obsessive_thinking = req.body.obsessive_thinking
    var depression = req.body.depression
    var anxiety = req.body.anxiety
    var lack_concentration = req.body.lack_concentration
    var section_8 = req.body.section_8
    var live_parents = req.body.live_parents
    var hospitalized = req.body.hospitalized
    
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./predictState.py',
    age,
    gender,
    tiredness,
    compulsive_behavior,
    panic_attacks,
    mood_swings,
    obsessive_thinking,
    depression,
    anxiety,
    lack_concentration,
    section_8,
    live_parents,
    hospitalized
    ]);
    console.log("enter//////");
    pyProg.stdout.on('data', function(data) {

        console.log(data.toString(),"klasdfklasf");
        
        if(data.toString() == 1){
            msg = "We're here for you. Please Contact Us for a Free Consultation session with our Expert";
        }
        else{    
            msg = "Join Our Music Therapy with Spotify and Vent it out!!";        
        }
        res.status(200).send({ resCode: 200, message: msg});
    });
    }
    catch(err){
        res.status(400).send({ resCode: 400, message: err});
    }
    
});

module.exports = router;