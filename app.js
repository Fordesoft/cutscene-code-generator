const inputString = "ararrrrrratrg";
const startingCutsceneNumber = 38;
const cutscenePrefix = "PRISON_CUTSCENE0";

const speakers = {
	'r': {
		name: 'CHARACTER_ROSCO',
		portrait: 'this.portraitRosco'
	},

	'a': {
		name: 'CHARACTER_APOLLO',
		portrait: 'PortraitManager.GetInstance().portraitMainCharacterNoSubjugator'
	},

	't': {
		name: 'CHARACTER_TERIS',
		portrait: 'this.portraitTeris'
	},

	'g': {
		name: 'CHARACTER_GUARD',
		portrait: 'this.portraitGuard'
	}
};

var resultString = "";

var currentCutsceneNumber = startingCutsceneNumber;
for (var i = 0; i < inputString.length; i++) {
	var characterLetter = inputString.charAt(i);
	if (typeof(speakers[characterLetter]) == 'undefined') {
		console.log("Unknown letter '" + characterLetter + "' in inputString.  Ensure there's a matching key in 'speakers' object.");
		System.exit(1);
	}
	else {
		resultString += "\n";
		resultString += "            Game.instance.SetPortraitImage(" + speakers[characterLetter].portrait + ");\n";


resultString += "            Game.instance.ShowMessage(\n";
resultString += "                I2.Loc.LocalizationManager.GetTranslation(\"" + speakers[characterLetter].name + "\"),\n";
resultString += "                I2.Loc.LocalizationManager.GetTranslation(\"" + cutscenePrefix + currentCutsceneNumber + "\"\n";
resultString += "            );\n";
resultString += "            yield return new WaitUntilMessageIsClosed();\n";

        currentCutsceneNumber++;
	}
}

console.log(resultString);
