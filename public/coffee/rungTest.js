// Generated by CoffeeScript 1.6.2
(function() {
  var ProgramValidator, RungValidator;

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

  Array.prototype.percentMatch = function(otherArray) {
    var count, el, i, _i, _len;

    count = 0;
    for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
      el = this[i];
      if (el === otherArray) {
        count += 1;
      }
    }
    return count / float(this.length);
  };

  RungValidator = (function() {
    function RungValidator(correct, ladder) {
      this.correct = correct;
      this.ladder = ladder;
      this.regExList = {
        "contacts": /XI[OC],\w{1,2}:\d{1,3}\/\d{1,2}/g,
        "coils": /OT[LUE],\w{1,2}:\d{1,3}\/\d{1,2}/g,
        "branches": /(BST,\d | NXT,\d | BND,\d)/g,
        "timers": /TO[NF],T4:\d{1,3},\d{1,10}/g,
        "counters": /CT[UD],C5:\d{1,3},\d{1,10}/g
      };
    }

    RungValidator.prototype.testMatch = function(regexName) {
      var regex;

      regex = this.regExList[regexName];
      this.correctMatch = this.correct.match(regex);
      this.ladderMatch = this.ladder.match(regex);
      return this.correctMatch && this.ladderMatch && this.correctMatch.equals(this.ladderMatch);
    };

    RungValidator.prototype.howClose = function() {
      var close, regex, regexName, _i, _len, _ref;

      close = 0.0;
      _ref = this.regExList;
      for (regexName = _i = 0, _len = _ref.length; _i < _len; regexName = ++_i) {
        regex = _ref[regexName];
        if (!this.testMatch(regexName)) {
          close += this.correctMatch.percentMatch(this.ladderMatch);
        } else {
          close += 1;
        }
      }
      return close / float(this.regExList.length);
    };

    return RungValidator;

  })();

  "use strict";

  ProgramValidator = (function() {
    function ProgramValidator(correctFileName, studentFileName) {
      this.correctFileName = correctFileName;
      this.studentFileName = studentFileName;
    }

    ProgramValidator.prototype.testRungs = function() {
      var MaxRungMatchPercent, howClose, programMatchPercent, rung, rungValidator, testRung, _i, _j, _len, _len1;

      programMatchPercent = 0;
      for (_i = 0, _len = correctRungs.length; _i < _len; _i++) {
        rung = correctRungs[_i];
        MaxRungMatchPercent = 0;
        for (_j = 0, _len1 = studentRungs.length; _j < _len1; _j++) {
          testRung = studentRungs[_j];
          rungValidator = new RungValidator(rung, testRung);
          howClose = rungValidator.howClose;
          if ((1 - howClose) < 0.0001) {
            MaxRungMatchPercent = 1.0;
            break;
          } else if (howClose > MaxRungMatchPercent) {
            MaxRungMatchPercent = howClose;
          }
        }
        programMatchPercent += MaxRungMatchPercent;
      }
      return programMatchPercent / float(correctRungs.length);
    };

    return ProgramValidator;

  })();

}).call(this);