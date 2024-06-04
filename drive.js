AFRAME.registerComponent("drive", {
    init: function () {
        var gameStateVal = this.el.getAttribute("game")
        if (gameStateVal == "play") {
            this.driveCar()
        }
    },

    driveCar: function () {
        var multiply = 10
        var wheelRotation = 0
        window.addEventListener("keydown", function (e) {
            var wheel = document.querySelector("#controlWheel")
            if (e.code == "ArrowRight" && wheelRotation > -40) {
                wheelRotation -= 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }

            if (e.code == "ArrowLeft" && wheelRotation < 40) {
                wheelRotation += 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }

            var cameraRig = document.querySelector("#cameraRig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControls = cameraRig.getAttribute("movement-controls")
            cameraRig.setAttribute("movement-controls", { "speed": cameraMoveControls.speed + 0.005 })
            var cameraDirection = new THREE.Vector3()

            cameraRig.object3D.getWorldDirection(cameraDirection)
            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })
                cameraRig.setAttribute("movement-controls", { "speed": cameraMoveControls.speed + 0.005 })
            }

            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })
                cameraRig.setAttribute("movement-controls", { "speed": cameraMoveControls.speed + 0.005 })
            }

            if (e.code == "ArrowUp") {
                multiply += 0.5
                if (multiply < 100 && cameraPosition.z > -500) {
                    cameraRig.setAttribute("movement-controls", { "speed": cameraMoveControls.speed + 0.005 })
                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute("text", { value: multiply })
                    var acceleration = document.querySelector("#controlAccel")
                    acceleration.setAttribute("material", "color", "green")

                }
            }

            if (e.code == "Space") {
                cameraRig.setAttribute("movement-controls", { "speed": 0 })
                var stopCar = document.querySelector("#controlBrakes")
                stopCar.setAttribute("material", "color", "red")
            }
        })

        window.addEventListener("keyup", function (e) {
            var cameraRig = document.querySelector("#cameraRig")
            var cameraDirection = new THREE.Vector3()
            cameraRig.object3D.getWorldDirection(cameraDirection)
            var cameraMoveControls = cameraRig.getAttribute("movement-controls")

            if (e.code == "Space") {
                 var stopCar = document.querySelector("#controlBrakes")
                stopCar.setAttribute("material", "color", "gray")
            }
            
            if (e.code == "ArrowUp") {
               
                if (multiply > 10) {
                    multiply -= 0.5
                    cameraRig.setAttribute("movement-controls", { "speed": cameraMoveControls.speed + 0.005 })
                }
                var acceleration = document.querySelector("#controlAccel")
                acceleration.setAttribute("material", "color", "gray")
            }
           
        })
    }


}
);
