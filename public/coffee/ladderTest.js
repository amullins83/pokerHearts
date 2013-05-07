// Generated by CoffeeScript 1.6.2
(function() {
  var RSLValidator;

  Array.prototype.equals = function(otherArray) {
    var el, i, _i, _len;

    if (this.length !== otherArray.length) {
      return false;
    }
    for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
      el = this[i];
      if (el !== otherArray[i]) {
        return false;
      }
    }
    return true;
  };

  RSLValidator = (function() {
    function RSLValidator(correct, ladder) {
      this.correct = correct;
      this.ladder = ladder;
      this.regExList = {
        "inputs": /XI[OC],I:\d\/\d{1,2}/g,
        "outputs": /OT[LUE],O:\d\/\d{1,2}/g
      };
    }

    RSLValidator.prototype.testMatch = function(regexName) {
      var correctMatch, ladderMatch, regex;

      regex = this.regExList[regexName];
      correctMatch = this.correct.match(regex);
      ladderMatch = this.ladder.match(regex);
      return correctMatch && ladderMatch && correctMatch.equals(ladderMatch);
    };

    return RSLValidator;

  })();

}).call(this);
