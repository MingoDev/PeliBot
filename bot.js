const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');

const globalCooldown = 10000;

const botTextChannelID = '635660555457134603';
const botVoiceChannelID = '636344717914800153';

const commands = {
    // Other commands
    '!halp': {'audio' : null, 'desc' : 'A list of available commands.'},
    '!rng': {'audio' : null, 'desc' : 'Do you feel lucky, punk?'},
    '!stahp': {'audio' : null, 'desc' : 'Stops the current command.'},
    // Secret commands
    '!dbz' : {'audio' : 'over_9000.mp3', 'desc' : null, 'volume' : 1, 'secret' : 1},
    '!drama' : {'audio' : 'drama.mp3', 'desc' : null, 'volume' : 1, 'secret' : 1},
    '!kingmaker' : {'audio' : 'roi_arthur.mp3', 'desc' : null, 'volume' : 1, 'secret' : 1},
    '!lelancepatate' : {'audio' : 'lance_patate.mp3', 'desc' : null, 'volume' : 0.8, 'secret' : 1},
    '!leviosa' : {'audio' : 'leviosa.mp3', 'desc' : null, 'volume' : 1, 'secret' : 1},
    '!savageFap' : {'audio' : 'savage_fap.mp3', 'desc' : null, 'volume' : 1, 'secret' : 1},
    '!youarealreadydead' : {'audio' : 'omae_wa.mp3', 'desc' : null, 'volume' : 0.4, 'secret' : 1},
    '!wow': {'audio' : 'wow.mp3', 'desc' : null, 'volume' : 1, 'secret' : 0.3},
    '!wtfBOOM' : {'audio' : 'wtf_boom.mp3', 'desc' : null, 'volume' : 0.5, 'secret' : 1},
    '!xxx' : {'audio' : 'sexy_sax.mp3', 'desc' : null, 'volume' : 0.8, 'secret' : 1},
    // Sound commands
    '!balls' : {'audio' : 'balls_of_steel.mp3', 'desc' : 'A ballsy man overshares.', 'volume' : 0.8},
    '!bigpun' : {'audio' : 'big_pun.mp3', 'desc' : 'You think it\'s funny, nobody else does.', 'volume' : 0.8},
    '!bully' : {'audio' : 'bully.mp3', 'desc' : 'Cyber bullying is a crime.', 'volume' : 1},
    '!crickets' : {'audio' : 'crickets.mp3', 'desc' : 'So awkward...', 'volume' : 0.8},
    '!dayum' : {'audio' : 'dayum.mp3', 'desc' : 'Two talented actors react to something impressive.', 'volume' : 1},
    '!f' : {'audio' : 'sad_violin.mp3', 'desc' : 'Press F to pay respects.', 'volume' : 0.9},
    '!fail' : {'audio' : 'failure.mp3', 'desc' : 'Happens to the best of us.', 'volume' : 0.8},
    '!fbi' : {'audio' : 'fbi.mp3', 'desc' : 'Quick! Put you HDD in the microwave!', 'volume' : 0.9},
    '!fuckedUp' : {'audio' : 'he_fucked_up.mp3', 'desc' : 'Sudden realisation of a mistake.', 'volume' : 0.9}, // REDO THIS ONE
    '!gaydar' : {'audio' : 'gaydar.mp3', 'desc' : 'Not heterosexual by any means.', 'volume' : 0.8},
    '!gtfo' : {'audio' : 'gtfo.mp3', 'desc' : 'Run.', 'volume' : 0.6},
    '!hellodarkness' : {'audio' : 'hello_buddy.mp3', 'desc' : 'Say hello to every emo kid\'s best friend.', 'volume' : 1},
    '!jeff' : {'audio' : 'jeff.mp3', 'desc' : 'Say my name.', 'volume' : 1},
    '!mg' : {'audio' : 'metal_gear.mp3', 'desc' : 'Metal gear!', 'volume' : 1},
    '!mlg' : {'audio' : 'mlg_air_horn.mp3', 'desc' : 'POGGERS!', 'volume' : 0.5},
    '!nein' : {'audio' : 'nein.mp3', 'desc' : 'Hitler receives his gas bill.', 'volume' : 0.8},
    '!no' : {'audio' : 'darth_vader_no.mp3', 'desc' : 'The women and the children, too.', 'volume' : 0.8},
    '!nom' : {'audio' : 'nom.mp3', 'desc' : 'Nom nom nom nom nom...', 'volume' : 0.9},
    '!nope' : {'audio' : 'engineer_nope.mp3', 'desc' : 'Listen to him, he\'s an engineer.', 'volume' : 1},
    '!oof' : {'audio' : 'oof.mp3', 'desc' : 'That\'s gotta hurt.', 'volume' : 1},
    '!ohboi' : {'audio' : 'oh_boi.mp3', 'desc' : 'When business is killing.', 'volume' : 1},
    '!praise' : {'audio' : 'praise.mp3', 'desc' : 'A miracled has occured. Praise RNGesus!', 'volume' : 0.8}, // REDO THIS ONE
    '!psychoalert' : {'audio' : 'psycho_alert.mp3', 'desc' : 'Kid tested, Antoine Daniel approved.', 'volume' : 1},
    '!rimshot' : {'audio' : 'rimshot.mp3', 'desc' : 'Ba-dum-tsss!', 'volume' : 1},
    '!sureboutdat' : {'audio' : 'u_sure_bout_dat.mp3', 'desc' : 'John\'s doubting you.', 'volume' : 0.8},
    '!sexytime' : {'audio' : 'sexy_sax.mp3', 'desc' : 'The lights are dimmed, the candles are lit.', 'volume' : 0.8},
    '!tbc' : {'audio' : 'tbc.mp3', 'desc' : 'Roundabout.', 'volume' : 0.8},
    '!trains' : {'audio' : 'i_like_trains.mp3', 'desc' : 'You better run!', 'volume' : 0.8},
    '!trololo' : {'audio' : 'trololo.mp3', 'desc' : 'A lovely song by Eduard Khil.', 'volume' : 0.8},
    '!rapbattle' : {'audio' : 'rap_battle.mp3', 'desc' : 'A crowd of youth is going wild.', 'volume' : 0.3},
    '!ree' : {'audio' : 'ree.mp3', 'desc' : 'A cry for help from a tragic youth.', 'volume' : 0.9},
    '!runbitch' : {'audio' : 'run_bitch.mp3', 'desc' : 'Serious advice from a brother.', 'volume' : 0.9},
    '!weeb' : {'audio' : 'tuturu.mp3', 'desc' : 'Greeting from Stein\'s Gate\'s annoying character.', 'volume' : 0.8},
    '!win' : {'audio' : 'fanfare.mp3', 'desc' : 'Flawless victory.', 'volume' : 0.1},
    '!whocares' : {'audio' : 'nobody_cares.mp3', 'desc' : 'When it\'s trivial.', 'volume' : 0.9},
    '!x' : {'audio' : 'i_need_healing.mp3', 'desc' : 'Genji saying "I need healing".', 'volume' : 0.9},
    '!xfiles' : {'audio' : 'x_files.mp3', 'desc' : 'A mistery...', 'volume' : 0.8},
    '!yeet' : {'audio' : 'yeet.mp3', 'desc' : 'YEET!', 'volume' : 1},
    '!yes' : {'audio' : 'bison_yes_yes.mp3', 'desc' : 'Bison\'s catchphrase.', 'volume' : 0.7},
};

const errors = {
    'cooldown': 'Squawk! The PeliBot is busy eating fish at the moment (' + (globalCooldown/1000)  + ' seconds cooldown).',
    'not_a_command': 'Squawk! This command is invalid. Use \'!halp\' for a list of available commands.',
    'not_in_a_channel': 'Squawk! You need to be in a voice channel for the PeliBot to grace you with its presence.',
    'not_in_voice_channel' : 'Squawk! You can\'t stop me!',
};

var isReady = true;

function startCooldown (cooldown = globalCooldown) {
    if (isReady) isReady = false;
    setTimeout(function(){
        isReady = true;
    }, cooldown);
}

function checkCooldown (channel) {
    if (!isReady) channel.send(errors['cooldown']);
    return isReady;
}

function returnToNest () {
    // Since we can't keep track of the bot's current channel, we join a given channel and leave it.
    // We can make the channel private to make sure users don't get to hear alerts when the bot joins and leaves the channel.
    let channel = bot.channels.get(botVoiceChannelID);
    channel.join();
    channel.leave();
}

bot.on('message', message => {

    // Check if message is a DM
    if (message.guild === null) return;

    let command = message.content;
    let textChannel = message.channel;
    let voiceChannel = message.member.voiceChannel;

    // Check if message is from PeliBot Channel
    if (textChannel.id !== botTextChannelID) return;

    // Check if message is an intended command and not from a bot
    if (command.charAt(0) !== '!' || message.author.bot) return;

    // Handle commands without audio
    if (command === '!halp') {

        let messageToSend = 'Squawk! Here is a list of my available commands: \n';

        for (let command in commands) {
            let cmd = commands[command];
            if (!cmd.hasOwnProperty('secret')) messageToSend += command + ' : ' + cmd.desc + ' \n';
        }

        message.channel.send(messageToSend);
        return;

    }

    if (command === '!stahp' && typeof voiceChannel !== 'undefined') {
        returnToNest();
        return;
    } else if (command === '!sthap' && typeof voiceChannel === 'undefined') {
        let errorMessage = errors['not_in_voice_channel'];
        message.channel.send(errorMessage);
        return;
    }

    if (command === '!rng') {
        let roulette = [];
        for (let command in commands) {
            let cmd = commands[command];
            if (cmd.audio !== null) roulette.push(command);
        }
        if (roulette.length > 0 ) command = roulette[Math.floor(Math.random()*roulette.length)];
    }

    // Not a valid command
    if (!(command in commands)) {
        let errorMessage = errors['not_a_command'];
        message.channel.send(errorMessage);
        return;
    }

    // Not in a voice channel
    if (typeof voiceChannel === 'undefined') {
        let errorMessage = errors['not_in_a_channel'];
        message.channel.send(errorMessage);
        return;
    }

    // Check cooldown
    if (!checkCooldown(textChannel)) return;

    // Commands with audio
    isReady = false;

    let cmd = commands[command];
    let audioFile = cmd.audio;
    let audioVolume = cmd.volume !== 'undefined'
        ? commands[command].volume
        : 1;

    voiceChannel.join().then( connection =>
    {
        const dispatcher = connection.playFile('./assets/sounds/' + audioFile, { volume : audioVolume });
        dispatcher.on("end", end => {
            returnToNest();
        });
    }).catch(err => console.log(err));
    startCooldown();

});

bot.login(auth.token);