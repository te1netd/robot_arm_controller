input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . # # # .
        . # . # .
        . # # # .
        . # . # .
        . # . # .
        `)
    joystick_calibration()
})
function joystick_calibration () {
    basic.showLeds(`
        . # # # .
        . # # # .
        . # # # .
        . . # . .
        . . # . .
        `)
    for (let index = 0; index < 1; index++) {
        pinread_ave = 0
        for (let index = 0; index < 10; index++) {
            pinread_ave += pins.analogReadPin(AnalogPin.P0)
            basic.pause(1)
        }
        pin0_calib = pinread_ave / 10
    }
    basic.showLeds(`
        # # # # .
        . # # # .
        . # # # .
        . . # . .
        . . # . .
        `)
    for (let index = 0; index < 1; index++) {
        pinread_ave = 0
        for (let index = 0; index < 10; index++) {
            pinread_ave += pins.analogReadPin(AnalogPin.P1)
            basic.pause(1)
        }
        pin1_calib = pinread_ave / 10
    }
    basic.showLeds(`
        . # # # .
        # # # # .
        . # # # .
        . . # . .
        . . # . .
        `)
    for (let index = 0; index < 1; index++) {
        pinread_ave = 0
        for (let index = 0; index < 10; index++) {
            pinread_ave += pins.analogReadPin(AnalogPin.P10)
            basic.pause(1)
        }
        pin10_calib = pinread_ave / 10
    }
    basic.showLeds(`
        . # # # .
        . # # # .
        # # # # .
        . . # . .
        . . # . .
        `)
    for (let index = 0; index < 1; index++) {
        pinread_ave = 0
        for (let index = 0; index < 10; index++) {
            pinread_ave += pins.analogReadPin(AnalogPin.P2)
            basic.pause(1)
        }
        pin2_calib = pinread_ave / 10
    }
    basic.showLeds(`
        . # # # .
        . # # # .
        . # # # .
        # . # . .
        . . # . .
        `)
    for (let index = 0; index < 1; index++) {
        pinread_ave = 0
        for (let index = 0; index < 10; index++) {
            pinread_ave += pins.analogReadPin(AnalogPin.P3)
            basic.pause(1)
        }
        pin3_calib = pinread_ave / 10
    }
    basic.showLeds(`
        . # # # .
        . # # # .
        . # # # .
        . . # . .
        # . # . .
        `)
    for (let index = 0; index < 1; index++) {
        pinread_ave = 0
        for (let index = 0; index < 10; index++) {
            pinread_ave += pins.analogReadPin(AnalogPin.P4)
            basic.pause(1)
        }
        pin4_calib = pinread_ave / 10
    }
    basic.showLeds(`
        . # # # .
        . # # # .
        . # # # .
        . . # . .
        . . # . .
        `)
}
let updown = 0
let pinread = 0
let message = 0
let pin4_calib = 0
let pin3_calib = 0
let pin2_calib = 0
let pin10_calib = 0
let pin1_calib = 0
let pin0_calib = 0
let pinread_ave = 0
let debug = 1
let up_threshold = -75
let down_threshold = 75
basic.showLeds(`
    . # # # .
    . # # # .
    . # # # .
    . . # . .
    . . # . .
    `)
joystick_calibration()
radio.setGroup(123)
basic.forever(function () {
    message = 0
    for (let index = 0; index < 1; index++) {
        pinread = pins.analogReadPin(AnalogPin.P0) - pin0_calib
        if (debug == 1) {
            serial.writeValue("p0", pinread)
        }
        // pin0 read
        if (pinread < up_threshold) {
            message += 1
        } else if (pinread > down_threshold) {
            message += 9
        }
        message = message * 10
        pinread = pins.analogReadPin(AnalogPin.P1) - pin1_calib
        if (debug == 1) {
            serial.writeValue("p1", pinread)
        }
        // pin1 read
        if (pinread < up_threshold) {
            message += 1
        } else if (pinread > down_threshold) {
            message += 9
        }
        message = message * 10
        pinread = pins.analogReadPin(AnalogPin.P2) - pin2_calib
        if (debug == 1) {
            serial.writeValue("p2", pinread)
        }
        // pin2 read
        if (pinread < up_threshold) {
            message += 1
        } else if (pinread > down_threshold) {
            message += 9
        }
        message = message * 10
        pinread = pins.analogReadPin(AnalogPin.P3) - pin3_calib
        if (debug == 1) {
            serial.writeValue("p3", pinread)
        }
        // pin3 read
        if (pinread < up_threshold) {
            message += 1
        } else if (pinread > down_threshold) {
            message += 9
        }
        message = message * 10
        pinread = pins.analogReadPin(AnalogPin.P4) - pin4_calib
        if (debug == 1) {
            serial.writeValue("p4", pinread)
        }
        // pin4 read
        if (pinread < up_threshold) {
            message += 1
        } else if (pinread > down_threshold) {
            message += 9
        }
        message = message * 10
        pinread = pins.analogReadPin(AnalogPin.P10) - pin10_calib
        if (debug == 1) {
            serial.writeValue("pA", pinread)
        }
        // pin10 read
        if (pinread < up_threshold) {
            message += 9
        } else if (pinread > down_threshold) {
            message += 1
        }
    }
    if (debug == 1) {
        serial.writeValue("message", message)
    }
    radio.sendNumber(message)
    updown = 0
    while (message > 0) {
        updown += message % 10
        message = Math.trunc(message / 10)
    }
    if (updown == 1) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (updown == 9) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else {
        basic.clearScreen()
    }
})
