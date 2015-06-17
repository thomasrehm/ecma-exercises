var rng = (function (win) {
    'use strict';
    var doc = win.document,
        run = false,
        SEED, MIN, MAX;
    // Establish the parameters of the generator
    var m = 25,
        // a - 1 should be divisible by m's prime factors
        a = 11,
        // c and m should be co-prime
        c = 17;
    // Setting the seed
    var z, z_rnd;
    var counterObject = {};
    counterObject.sum = 0;


    function rng(min, max, seed) {
        SEED = seed,
            MIN = min,
            MAX = max
        if (SEED == null) {
            z = 3;
            SEED = z;
        } else {
            z_rnd = SEED;
        }
        if (MIN == null) {
            MIN = 0;
            //return MIN;
        }
        if (MAX == null) {
            can_width = welt.can_width;
            // MAX = parseInt(welt.can_width);
            MAX = can_width;
            console.log(can_width);
            //return max;
        }
        console.log('Seed: ' + SEED);
        console.log('min: ' + MIN);
        console.log('max: ' + MAX);
        return SEED, MIN, MAX;

    }

    function rng_own() {
        var m = 25,
            // a - 1 should be divisible by m's prime factors
            a = 11,
            // c and m should be co-prime
            c = 17;
        // define the recurrence relationship
        // z = (a * z + c) % m;
        z_rnd = MIN + (a * z_rnd + c) % (MAX - MIN);
        //z_rnd = z_rnd >>> 32;
        z = z_rnd; //MIN + parseInt(z_rnd * (MAX-MIN+1));
        console.log('z: ' + z + 'z_rnd: ' + z_rnd);
        // return an integer
        // Could return a float in (0, 1) by dividing by m

        return z;
    }

    function rng_own_alt() {
        var m = 27,
            // a - 1 should be divisible by m's prime factors
            a = 12,
            // c and m should be co-prime
            c = 17;
        // define the recurrence relationship
        // z = (a * z + c) % m;
        z_rnd = MIN + (a * z_rnd + c) % (MAX - MIN);
        //z_rnd = z_rnd >>> 32;
        z = z_rnd; //MIN + parseInt(z_rnd * (MAX-MIN+1));
        console.log('z: ' + z + 'z_rnd: ' + z_rnd);
        // return an integer
        // Could return a float in (0, 1) by dividing by m

        return z;
    }


    function rng_default() {
        // define the recurrence relationship
        // z = (a * z + c) % m;
        //z_rnd = (a * z_rnd + c) % MAX;
        //z_rnd = z_rnd >>> 32;
        z = MIN + parseInt(Math.random() * (MAX - MIN + 1));
        console.log('z: ' + z); //+ 'z_rnd: ' + z_rnd);
        // return an integer
        // Could return a float in (0, 1) by dividing by m

        return z;
    }


    var interval_id = 0;

    function startstophandler() {
        if (document.getElementById("startstopbutton").value == "start") {
            // Start the timer
            document.getElementById("startstopbutton").value = "stop";

            interval_id = setInterval('rng.do_rng_own_and_show()', 20);
        } else {
            // document.getElementById("wooYayMessage").innerHTML = "";
            document.getElementById("startstopbutton").value = "start";
            clearInterval(interval_id);
            welt.printStat('Anzahl', counterObject.sum);
            console.log(counterObject);
        }
    }
    var einheit = 4;

    function do_rng_own_and_show() {
        if (document.getElementById('rng_own').checked) {

            rng_own();
        } else if (document.getElementById('rng_own_alt').checked) {
            rng_own_alt();
        } else {
            rng_default();
        }
        if (!counterObject[z]) {
            counterObject[z] = einheit;
        } else if (counterObject[z] >= einheit) {
            counterObject[z] = counterObject[z] + einheit;
        }
        counterObject.sum = counterObject.sum + 1;

        welt.drawLine(z, 0, z, counterObject[z]);
        console.log(counterObject[z])


        // welt
    }


    function resetVals() {
        counterObject = 0;
        counterObject = {};
        counterObject.sum = 0;
        console.log('reset');
    }

    return {
        rng_own: rng_own,
        rng_own_alt: rng_own_alt,
        resetVals: resetVals,
        do_rng_own_and_show: do_rng_own_and_show,
        rng: rng,
        startstophandler: startstophandler
    };
}(window));
