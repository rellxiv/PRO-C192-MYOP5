AFRAME.registerComponent("game", {
    schema: {
        gameState: { type: "string", default: "play" }
    },

    init: function () {
        var duration = 300
        var timerEl = document.querySelector("#timer")
        this.startTimer(duration, timerEl)
    },

    startTimer: function (duration, timerEl) {
        var minutes, seconds
        setInterval(() => {
            if (duration >= 0) {
                this.data.gameState = "play"
                minutes = parseInt(duration / 60)
                seconds = parseInt(duration % 60)
                // 8: 8
                // 08:05
                if (minutes < 10) {
                    minutes = "0" + minutes
                }
                if (seconds < 10) {
                    seconds = "0" + seconds
                }
                timerEl.setAttribute("text", {
                    value : minutes + ":" + seconds
                })

                duration -= 1
            }
            else{
                this.data.gameState = "over"
                var camVel = document.querySelector("#cameraRig")
                camVel.setAttribute("velocity", {x : 0, y : 0, z : 0})

                var overText = document.querySelector("#over")
                overText.setAttribute("visible", true)

                var carSpeed = document.querySelector("#speed")
                carSpeed.setAttribute("text", {value : "0km/h"})
                
                var speedUnit = document.querySelector("#unit")
                speedUnit.setAttribute("visible", false)
            }
        }, 100)

    }
})