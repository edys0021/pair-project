function fotmatDate(input) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return input.toLocaleDateString('id-ID', options)
}

module.exports = fotmatDate