const packages = [
    { heavy: true, priority: false, fragile: false, to: 'Harrington', trackingNumber: '1324kjs' },
    { heavy: false, priority: true, fragile: true, to: 'Mark', trackingNumber: '1325sdk' },
    { heavy: true, priority: false, fragile: true, to: 'Mick', trackingNumber: 'jffd147' },
    { heavy: false, priority: false, fragile: false, to: 'Jake', trackingNumber: 'acdc145' },
    { heavy: true, priority: true, fragile: true, to: 'Brittany', trackingNumber: 'suz23234' },
    { heavy: false, priority: true, fragile: false, to: 'Zach', trackingNumber: '8081baz' },
    { heavy: true, priority: false, fragile: true, to: 'Jeremy', trackingNumber: 'suz2367' }]

let currentPackages = packages
let lostPackage = null


function findHeavy() {
    let findHeavy = packages.filter(packages => packages.heavy == true)

    console.log(findHeavy);

    currentPackages = findHeavy

}


function drawPackages() {
    let template = ''
    currentPackages.forEach(packages => {
        template += `
        <div class="col-md-12 text-light bg-dark d-flex rounded shadow justify-content-center text-center m-2 p-2" onclick="found('${packages.to}')" >
            <p class="me-5 p-4 fs-1">${packages.to}</p>
            <p class="ms-5 p-4 fs-1">${packages.trackingNumber}<p>
        </div>
`
    })
    // console.log(template);

    document.getElementById('packages').innerHTML = template
}



function sort(attribute) {
    let sortPackages = currentPackages.filter(packages => packages[attribute] == lostPackage[attribute])

    console.log(sortPackages);

    currentPackages = sortPackages

    drawPackages()
}





function trackPackage() {

    let index = Math.floor(Math.random() * currentPackages.length)
    console.log(index)
    currentPackages[index].lost = true
    console.log('what package is lost', currentPackages[index]);

    lostPackage = currentPackages[index]


}


function found(name) {
    let found = currentPackages.find(p => p.to == name)
    console.log(found);

    if (found.to == lostPackage.to) {
        toast("You found them", 'success', 'harrison says whatup')
        // This line trackPackage() is responsible for restarting the game if I select the right person 
        resetGame()
        // TODO this window alert is firing before toast - so we may need a timeout here

        // and it will choose a new person with a lost package.
        // Harrison said to looking into window.confirm

    } else {
        // window.alert("you are fired")
        toast("You are fired", 'error')

    }
}

function resetGame() {
    if (window.confirm("Do you want to play again?")) {
        trackPackage()
        toast('Game Reset!', 'success', 'The game has been reset')
    }
}


function toast(title = "Default", icon = "success", text = 'You are Fired!') {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        timer: 1500,
    })

    // Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'You Found Them',
    //     footer: '<a href="">Why do I have this issue?</a>'
    // })



}



trackPackage()
drawPackages()
console.log(lostPackage);