module.exports = function () {
  var args = []
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  return args.join(' ')
}
